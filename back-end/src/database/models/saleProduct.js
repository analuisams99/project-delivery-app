module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
  {
    quantity: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'SalesProducts', underscored: true });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product,
      { as: 'product',
        through: SaleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId',
      });

    models.Product.belongsToMany(models.Sale,
      { as: 'sales',
        through: SaleProduct,
        foreignKey: 'productId',
        otherKey: 'saleId',
      });
  };

  return SaleProduct;
};