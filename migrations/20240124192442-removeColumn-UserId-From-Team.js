'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Teams", "UserId")
  },

  async down(queryInterface, Sequelize) {
  }
};
