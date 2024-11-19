module.exports = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize;
    const user = sequelize.define("users", {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
    });
  
    return user;
  };
  