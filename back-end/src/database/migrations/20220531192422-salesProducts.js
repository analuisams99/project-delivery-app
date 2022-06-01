'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('SalesProducts', {
      saleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sales',
          key: 'id',
        },
        field: 'sale_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        field: 'product_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('SalesProducts');
  }
};
