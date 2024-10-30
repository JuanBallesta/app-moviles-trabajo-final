const Routes = require("express").Router();
const tasteController = require("../controllers/tastes.controller");

Routes.post("/", tasteController.createTaste);
Routes.get("/", tasteController.getAllTastes);
Routes.get("/list", tasteController.list);
Routes.get("/:id", tasteController.getOneTaste);
Routes.put("/:id", tasteController.updateTaste);
Routes.delete("/:id", tasteController.deleteTaste);

module.exports = Routes;
