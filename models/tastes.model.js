module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const taste = sequelize.define("iceCreamTastes", {
    taste: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    nutritionalValue: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    photos: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  });

  return taste;
};
