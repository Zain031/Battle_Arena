'use strict';
const {
  Model
} = require('sequelize');
const { generateString } = require('../helper');

module.exports = (sequelize, DataTypes) => {
  class EventsHaveUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventsHaveUsers.init({
    eventCode: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.eventCode = generateString(10);
      }
    },
    sequelize,
    modelName: 'EventsHaveUsers',
  });
  return EventsHaveUsers;
};