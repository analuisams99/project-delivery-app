'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'seller_id',
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        field: 'total_price',
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        field: 'delivery_address',
        allowNull: false,
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        field: 'delivery_number',
        allowNull: false,
      },
      saleDate: {
        type: Sequelize.DATE,
        field: 'sale_date',
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pendente',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};
