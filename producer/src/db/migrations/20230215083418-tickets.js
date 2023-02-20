'use strict';

const {DataType} = require("sequelize-typescript");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      Promise.all(
          await queryInterface.createTable('tickets', {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            request: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false
            },
            result: {
              type: Sequelize.DataTypes.STRING,
              allowNull: true
            },
            status: {
              type: DataType.ENUM({values: ['in progress', 'finish']}),
              allowNull: false,
              defaultValue: 'in progress'
            }
          }),
      await queryInterface.addIndex('tickets', ['id'], { transaction }),
      await queryInterface.addIndex('tickets', ['request'], { transaction }),
      await transaction.commit()
      )
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tickets');
  }
};
