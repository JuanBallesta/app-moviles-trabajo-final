module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const productHasCart = sequelize.define("productHasCart", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return productHasCart;
};
