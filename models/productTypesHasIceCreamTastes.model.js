module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const productTypesHasIceCreamTastes = sequelize.define(
    "productTypesHasIceCreamTastes",
    {
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }
  );

  return productTypesHasIceCreamTastes;
};
