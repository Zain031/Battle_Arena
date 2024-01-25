'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'TeamId', {
      type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Teams',
          },
          key: 'id'
        },
        allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'TeamId');
  }
};