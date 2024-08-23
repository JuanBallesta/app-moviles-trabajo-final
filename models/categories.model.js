module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const categorie = sequelize.define("categories", {
    description: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  return categorie;
};
