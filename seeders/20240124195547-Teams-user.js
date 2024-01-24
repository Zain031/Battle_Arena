'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/team.json", "utf-8"))

    data.forEach(perData => {
      perData.createdAt = new Date();
      perData.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Teams', data, {}); //Stores nama table, data nama variable penyimpan data json

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Teams', null, {});

  }
};