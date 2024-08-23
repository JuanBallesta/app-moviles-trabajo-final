const Routes = require("express").Router();
const productController = require("../controllers/productTypes.controller");

Routes.post("/", productController.createProduct);
Routes.get("/", productController.getAllProducts);
Routes.get("/:id", productController.getOneProduct);
Routes.put("/:id", productController.updateProduct);
Routes.delete("/:id", productController.deleteProduct);

module.exports = Routes;
