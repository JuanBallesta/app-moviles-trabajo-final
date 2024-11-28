module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const comentario = sequelize.define("comentarios", {
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  });

  return comentario;
};
