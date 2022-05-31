module.exports = (sequelize, _DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
  {
    quantity: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'SalesProducts' });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product,
      { as: 'sales',
        through: SaleProduct,
        foreignKey: 'productId',
        otherKey: 'saleId',
      });

    models.Product.belongsToMany(models.Sale,
      { as: 'products',
        through: SaleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId',
      });
  };

  return SaleProduct;
};