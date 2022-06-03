module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
  {
    quantity: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'salesProducts', underscored: true });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product,
      { as: 'Products',
        through: SaleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId',
      });

    models.Product.belongsToMany(models.Sale,
      { as: 'Sales',
        through: SaleProduct,
        foreignKey: 'productId',
        otherKey: 'saleId',
      });
  };

  return SaleProduct;
};