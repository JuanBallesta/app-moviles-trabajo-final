const Routes = require("express").Router();
const categorieController = require("../controllers/categories.controller");

Routes.post("/", categorieController.createCategorie);
Routes.get("/", categorieController.getAllCategories);
Routes.get("/:id", categorieController.getOneCategorie);
Routes.put("/:id", categorieController.updateCategorie);
Routes.delete("/:id", categorieController.deleteCategorie);

module.exports = Routes;
