const Routes = require("express").Router();
const cartController = require("../controllers/carts.controller");

Routes.post("/", cartController.createCart);
Routes.get("/", cartController.getAllCarts);
Routes.get("/:id", cartController.getOneCart);

module.exports = Routes;
