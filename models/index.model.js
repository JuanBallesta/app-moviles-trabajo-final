const Sequelize = require("sequelize");
const config = require("../config/index.config");

const sequelize = new Sequelize(
  config.db.schema,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.iceCreamTastes = require("./tastes.model")(sequelize, Sequelize);
db.productTypes = require("./productTypes.model")(sequelize, Sequelize);
db.categories = require("./categories.model")(sequelize, Sequelize);
db.carts = require("./carts.model.js")(sequelize, Sequelize);
db.productHasCart = require("./productHasCart.model.js")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);
db.cupons = require("./cupons.model")(sequelize, Sequelize);
db.comentarios = require("./comentarios.model")(sequelize, Sequelize);

// Relaciones entre modelos

// Un helado tiene una categoria, una categoria tiene muchos helados.
db.categories.hasMany(db.iceCreamTastes);
db.iceCreamTastes.belongsTo(db.categories);

// Un gusto de helado puede estar en muchos tipos de producto, y un producto puede tener muchos gustos de helados.
db.productTypes.hasMany(db.iceCreamTastes);
db.iceCreamTastes.belongsTo(db.productTypes);

// Un producto puede tener muchos comentarios, y un comentario puede estar solo en un producto.
db.iceCreamTastes.hasMany(db.comentarios);
db.comentarios.belongsTo(db.iceCreamTastes);

// Un producto puede estar muchos carritos, y un carrito puede tener muchos productos.
db.iceCreamTastes.hasMany(db.productHasCart);
db.carts.hasMany(db.productHasCart);
db.productHasCart.belongsTo(db.iceCreamTastes);
db.productHasCart.belongsTo(db.carts);

module.exports = db;
