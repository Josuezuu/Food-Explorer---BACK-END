const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const favoritosRoutes = require("./favoritos.routes");
const requestsRoutes = require("./requests.routes");
const categoryRoutes = require("./category.routes");
const itemsRequestsRoutes = require("./items_requests.routes");
const sessionsRoutes = require("./sessions.routes");

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favoritos", favoritosRoutes);
routes.use("/carrinho", requestsRoutes);
routes.use("/category", categoryRoutes);
routes.use("/items_requests", itemsRequestsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
