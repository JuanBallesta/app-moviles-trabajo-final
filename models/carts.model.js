module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const cart = sequelize.define("carts", {
    totalCost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  return cart;
};
