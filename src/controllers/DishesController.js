const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

const diskStorage = new DiskStorage();

class DishesController {
  async create(request, response) {
    const { name, description, price, category_name, ingredients } =
      request.body;
    const { filename: avatar_dish } = request.file;

    const filename = await diskStorage.saveFile(avatar_dish);

    const checkDish = await knex("dishes").where({ name });

    if (checkDish.length > 0) {
      throw new AppError("Este prato já existe.", 401);
    }

    const category = await knex("category")
      .where({ name: category_name })
      .first();

    if (!category) {
      if (
        (category_name != "Refeição") |
        (category_name != "Bebidas") |
        (category_name != "Sobremesas")
      ) {
        throw new AppError("Esta categoria não existe.", 400);
      }
      const insert = await knex("category").insert({
        name: category_name,
      });
      const [dish_id] = await knex("dishes").insert({
        name,
        description,
        price,
        avatar_dish: filename,
        category_id: insert[0],
      });

      const ingredientsArray = ingredients.split(",");

      const ingredientsInsert = ingredientsArray.map((ingredient) => {
        return {
          dish_id,
          name: ingredient.trim(),
        };
      });

      await knex("ingredients")
        .insert(ingredientsInsert)
        .groupBy("dish_id")
        .orderBy("name");

      return response.status(200).json();
    }
    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      avatar_dish: filename,
      category_id: category.id,
    });

    const ingredientsArray = ingredients.split(",");

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        dish_id,
        name: ingredient.trim(),
      };
    });

    await knex("ingredients")
      .insert(ingredientsInsert)
      .groupBy("dish_id")
      .orderBy("name");

    return response.status(200).json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, price, category_name, ingredients } =
      request.body;
    const { filename: avatar_dish } = request.file;

    const filename = await diskStorage.saveFile(avatar_dish);

    const dish = await knex("dishes").where({ id }).first();
    const category = await knex("category")
      .where({ name: category_name })
      .first();

    if (!dish) {
      throw new AppError("Este prato não existe.", 404);
    }

    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;
    dish.avatar_dish = filename ?? dish.avatar_dish;

    await knex("dishes").where({ id: dish.id }).update({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      avatar_dish: dish.avatar_dish,
      category_id: category.id,
    });

    await knex("ingredients").where({ dish_id: dish.id }).delete();

    const ingredientsList = ingredients.split(",");

    for (let i = 0; i < ingredientsList.length; i++) {
      const ingredient = ingredientsList[i].trim();

      if (ingredient.id) {
        await knex("ingredients")
          .where({ id: ingredient.id })
          .update({ name: ingredient });
      } else {
        await knex("ingredients").insert({
          dish_id: dish.id,
          name: ingredient,
        });
      }
    }

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    if (!dish) {
      throw new AppError("Este prato não existe.", 404);
    }

    return response.json({
      ...dish,
      ingredients,
    });
  }

  async index(request, response) {
    const { ingredients, dish } = request.query;

    let dishes;

    const filterIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    const allIngredients = await knex("ingredients").select("*");
    const names = allIngredients.map((item) => item.name);

    const checkIngredient = filterIngredients.every((ingredient) =>
      names.includes(ingredient)
    );

    if (checkIngredient) {
      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.avatar_dish",
          "dishes.description",
          "dishes.price",
          "dishes.category_id",
        ])
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id");
    } else if (!checkIngredient && dish) {
      dishes = await knex("dishes")
        .select("*")
        .where("name", "ilike", `%${dish}%`)
        .orderBy("price");
    } else {
      dishes = await knex("dishes").select("*");
    }

    const selectIngredient = await knex("ingredients").select("*");
    const dishesWithIngredient = dishes.map((dish) => {
      const dishIngredient = selectIngredient.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: dishIngredient,
      };
    });

    return response.json(dishesWithIngredient);
  }

  async delete(request, response) {
    const { id } = request.params;

    const deleted = await knex("dishes").where({ id }).delete();

    if (!deleted) {
      throw new AppError("Este prato não existe.", 404);
    }

    return response.json();
  }
}

module.exports = DishesController;
