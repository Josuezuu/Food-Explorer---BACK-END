const { Router } = require("express");
const ItemsRequestsController = require("../controllers/ItemsRequestsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const itemsRequestsRoutes = Router();
const itemsRequestsController = new ItemsRequestsController();

itemsRequestsRoutes.use(ensureAuthenticated);

itemsRequestsRoutes.post("/", itemsRequestsController.create);
itemsRequestsRoutes.put("/:id", itemsRequestsController.update);
itemsRequestsRoutes.delete("/:id", itemsRequestsController.delete);

module.exports = itemsRequestsRoutes;
