exports.up = knex => knex.schema.createTable("items_requests", table => {
    table.increments("id").primary();
    table.integer("request_id").references("id").inTable("requests").onDelete("CASCADE");
    table.integer("dish_id").references("id").inTable("dishes");
    table.float("amount");
    table.decimal("unit_price", 8, 2);
    table.decimal("total_price", 8, 2);
});


exports.down = knex => knex.schema.dropTable("items_requests");
