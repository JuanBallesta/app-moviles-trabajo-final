module.exports = (app) => {
  const tastesRoutes = require("./tastes.routes");
  app.use("/tastes", tastesRoutes);

  const productRoutes = require("./productTypes.routes");
  app.use("/productTypes", productRoutes);

  const categorieRoutes = require("./categories.routes");
  app.use("/categories", categorieRoutes);

  const cartRoutes = require("./carts.routes");
  app.use("/carts", cartRoutes);

  const productDetailsRoutes = require("./productDetails.routes");
  app.use("/products", productDetailsRoutes);

  const userRoutes = require("./users.routes");
  app.use("/users", userRoutes);

  const cuponRoutes = require("./cupons.routes");
  app.use("/cupons", cuponRoutes);

  const comentarioRoutes = require("./comentarios.routes");
  app.use("/comentarios", comentarioRoutes);
};
