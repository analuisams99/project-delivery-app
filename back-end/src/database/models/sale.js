module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false 
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'user_id',
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'seller_id',
    },
    totalPrice: {type: DataTypes.DECIMAL(4, 2), allowNull: false},
    deliveryAddress: {type: DataTypes.STRING, allowNull: false},
    deliveryNumber: {type: DataTypes.STRING, allowNull: false},
    saleDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW, },
    status: {type: DataTypes.STRING, defaultValue: 'Pendente'},
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'User' });

    Sale.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'Seller' });
  };

  return Sale;
};