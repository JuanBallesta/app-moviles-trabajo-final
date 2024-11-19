module.exports = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize;
    const cupon = sequelize.define("cupons", {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    });
    return cupon;
  };
