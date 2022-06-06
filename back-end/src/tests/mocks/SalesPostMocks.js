const mockSale = {
  userId: 1,
  sellerId: 3,
  totalPrice: 12.00,
  deliveryAddress:  "Rua dos Bobos, 2",
  deliveryNumber: "987654321",
  products: [{productId: 7, quantity: 3}, {productId: 3, quantity: 1}]
};

const mockSaleWrong = {
  userId: 1,
  totalPrice: 12.00,
  deliveryAddress:  "Rua dos Bobos, 2",
  deliveryNumber: "987654321",
  products: [{productId: 7, quantity: 3}, {productId: 3, quantity: 1}]
};

const mockSaleResponse = {
  id: 1,
  userId: 1,
  sellerId: 1,
  totalPrice: 3.30,
  deliveryAddress:  'Rua dos Bobos, 0',
  deliveryNumber: '123456789',
  status: 'Pendente',
  saleDate: '2020-05-31T19:14:41.000Z',
};

module.exports = {
  mockSale,
  mockSaleResponse,
}