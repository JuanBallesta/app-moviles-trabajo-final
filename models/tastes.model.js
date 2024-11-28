module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const taste = sequelize.define("iceCreamTastes", {
    taste: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nutritionalValue: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    photos: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caracteristicas: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    especificaciones: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  });

  return taste;
};
