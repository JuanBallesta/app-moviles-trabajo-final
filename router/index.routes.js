module.exports = (app) => {
  const tastesRoutes = require("./tastes.routes");
  app.use("/tastes", tastesRoutes);

  const productRoutes = require("./productTypes.routes");
  app.use("/products", productRoutes);

  const categorieRoutes = require("./categories.routes");
  app.use("/categories", categorieRoutes);

  const cartRoutes = require("./carts.routes");
  app.use("/carts", cartRoutes);
};
