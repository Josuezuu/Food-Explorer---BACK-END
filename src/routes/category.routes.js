const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.use(ensureAuthenticated);

categoryRoutes.post("/", categoryController.create);
categoryRoutes.delete("/:id", categoryController.delete);

module.exports = categoryRoutes;
