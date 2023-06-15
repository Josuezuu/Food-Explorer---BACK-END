const { Router } = require("express");
const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoritosRoutes = Router();
const favoritesController = new FavoritesController();

favoritosRoutes.use(ensureAuthenticated);

favoritosRoutes.post("/", favoritesController.create);
favoritosRoutes.get("/", favoritesController.index);
favoritosRoutes.get("/:user_id", favoritesController.show);
favoritosRoutes.delete("/:id", favoritesController.delete);

module.exports = favoritosRoutes;
