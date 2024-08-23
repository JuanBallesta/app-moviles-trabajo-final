module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const product = sequelize.define("productTypes", {
    description: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  });

  return product;
};
