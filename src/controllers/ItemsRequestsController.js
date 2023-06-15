const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ItemsRequestsController {
  async create(request, response) {
    const { items, request_id } = request.body;

    const orderAddress = await knex("requests")
      .where({ id: request_id })
      .first();

    if (!orderAddress) {
      throw new AppError("Número do pedido inexistente.");
    }

    const itemsToInsert = await Promise.all(
      items.map(async (item) => {
        const dish = await knex("dishes").where({ id: item.dish_id }).first();

        if (!dish) {
          throw new AppError("Nome do prato não existe.");
        }

        return {
          amount: item.amount,
          request_id,
          dish_id: dish.id,
          unit_price: item.unit_price,
          total_price: item.total_price,
        };
      })
    );

    await knex("items_requests").insert(itemsToInsert);

    return response.json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { amount, dish_id } = request.body;

    const itemUpdate = await knex("items_requests").where({ id }).first();
    const dishPrice = await knex("dishes").where({ id: dish_id }).first();

    if (!dishPrice.id) {
      throw new AppError("Este item do pedido não existe.");
    }

    itemUpdate.dish_id = dish_id ?? itemUpdate.dish_id;
    itemUpdate.amount = amount ?? itemUpdate.amount;

    const total_price = Number(amount * dishPrice.price);

    await knex("items_requests").where({ id }).update({
      dish_id: itemUpdate.dish_id,
      amount: itemUpdate.amount,
      unit_price: dishPrice.price,
      total_price: total_price,
    });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("items_requests").where({ id }).delete();

    return response.json();
  }
}

module.exports = ItemsRequestsController;
