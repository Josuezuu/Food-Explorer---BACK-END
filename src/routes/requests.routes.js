const { Router } = require("express");
const RequestController = require("../controllers/RequestsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const requestsRoutes = Router();
const requestController = new RequestController();

requestsRoutes.use(ensureAuthenticated);

requestsRoutes.post("/", requestController.create);
requestsRoutes.get("/:user_id", requestController.show);
requestsRoutes.get("/", requestController.index);
requestsRoutes.patch("/:id", requestController.update);
requestsRoutes.delete("/:id", requestController.delete);

module.exports = requestsRoutes;
