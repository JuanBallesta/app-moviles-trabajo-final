const Routes = require("express").Router();
const cuponController = require("../controllers/cupons.controller");

Routes.post("/", cuponController.createCupon);
Routes.get("/", cuponController.getAllCupons);
Routes.get("/getDiscount", cuponController.getDiscount);
Routes.get("/:id", cuponController.getOneCupon);
Routes.put("/:id", cuponController.updateCupon);
Routes.delete("/:id", cuponController.deleteCupon);

module.exports = Routes;
