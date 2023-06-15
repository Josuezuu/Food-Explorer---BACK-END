const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const moment = require("moment-timezone");

class RequestController {
  async create(request, response) {
    const user_id = request.user.id;
    const saoPauloTime = moment.tz(Date.now(), "America/Sao_Paulo");
    const formattedDate = saoPauloTime.format("DD/MM - HH:mm");

    if (!user_id) {
      throw new AppError("Se conecte para poder comprar.");
    }

    const [id] = await knex("requests").insert({
      user_id,
      created_at: formattedDate,
      updated_at: formattedDate,
    });

    return response.json({
      id,
    });
  }

  async show(request, response) {
    const user_id = request.user.id;

    const orderAll = await knex("items_requests")
      .select([
        "requests.id",
        "requests.created_at",
        "requests.user_id",
        "requests.status",
      ])
      .innerJoin("requests", "requests.id", "items_requests.request_id")
      .where("requests.user_id", user_id)
      .orderBy("created_at")
      .groupBy("request_id");

    const requestWithItem = await Promise.all(
      orderAll.map(async (order) => {
        const items = await knex("items_requests")
          .select([
            "dishes.name as dish_name",
            "items_requests.amount",
            "items_requests.request_id",
          ])
          .innerJoin("dishes", "dishes.id", "items_requests.dish_id")
          .where("items_requests.request_id", order.id);

        return {
          ...order,
          items,
        };
      })
    );

    return response.json(requestWithItem);
  }

  async index(request, response) {
    const orderAll = await knex("items_requests")
      .select([
        "requests.id",
        "requests.created_at",
        "requests.user_id",
        "requests.status",
      ])
      .innerJoin("requests", "requests.id", "items_requests.request_id")
      .orderBy("created_at")
      .groupBy("request_id");

    const requestWithItem = await Promise.all(
      orderAll.map(async (order) => {
        const items = await knex("items_requests")
          .select([
            "dishes.name as dish_name",
            "items_requests.amount",
            "items_requests.request_id",
          ])
          .innerJoin("dishes", "dishes.id", "items_requests.dish_id")
          .where("items_requests.request_id", order.id);

        return {
          ...order,
          items,
        };
      })
    );

    return response.json(requestWithItem);
  }

  async update(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const order = await knex("requests").where({ id }).first();

    if (!order) {
      throw new AppError("Este prato não existe.", 404);
    }

    await knex("requests").where({ id }).update({
      status,
    });

    return response.status(200).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("requests").where({ id }).delete();

    return response.json(id);
  }
}

module.exports = RequestController;
