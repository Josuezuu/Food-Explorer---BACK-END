const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UsersController = require("../controllers/UsersController");
const SetIfUserIsAdminController = require("../controllers/SetIfUserIsAdminController");

const usersRoutes = Router();
const usersController = new UsersController();
const setIfUserIsAdminController = new SetIfUserIsAdminController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/", ensureAuthenticated, setIfUserIsAdminController.update);

module.exports = usersRoutes;
