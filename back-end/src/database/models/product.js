module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false 
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  });

  return Product;
};