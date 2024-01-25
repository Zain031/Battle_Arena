'use strict';
const {
  Model
} = require('sequelize');

var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "UserId" })
      User.belongsTo(models.Team, { foreignKey: "TeamId" })
      User.belongsToMany(models.Event, { through: 'EventsHaveUsers' });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be empty",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isUsernameValid(value) {
          if (value.length < 8) {
            throw new Error(
              "Email length must be at least 8 characters long"
            );
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
        isPasswordValid(value) {
          if (value.length < 8) {
            throw new Error(
              "Password length must be at least 8 characters long"
            );
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING,
    },
    TeamId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Teams',
        },
        key: 'id'
      },
      // allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {

        // GENERATE HASH PASSWORD
        const salt = bcrypt.genSaltSync(5);
        user.password = bcrypt.hashSync(user.password, salt);

        // user.role = 'Player'

        // CHECK ROLE USER, IF ROLE IS NOT DEFINED REGISTER IT AS ADMIN
        !user.role ? user.role = 'Player' : 'Admin'
        
        console.log(user.role, user.password);
        user.role == 'Admin' ? user.TeamId = 1 : user.TeamId = 2
        console.log(user.TeamId);
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};