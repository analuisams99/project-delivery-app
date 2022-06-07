const mockResultGetSales = [{
  id: 1,
  userId: 1,
  sellerId: 3,
  totalPrice: 12.00,
  deliveryAddress:  'Rua dos Bobos, 7',
  deliveryNumber: '2010',
  status: 'Pendente',
  saleDate: '2020-05-31T19:14:41.000Z',
}, {
  id: 2,
  userId: 2,
  sellerId: 3,
  totalPrice: 8.99,
  deliveryAddress:  'Rua dos Bobos, 24',
  deliveryNumber: '2020',
  status: 'Pendente',
  saleDate: '2020-05-31T19:14:41.000Z',
} ]

const mockResultGetOneSale = {
	id: 3,
	userId: 3,
	sellerId: 2,
	totalPrice: 20,
	deliveryAddress: 'Rua dos Bobos, 24',
	deliveryNumber: '2022',
	saleDate: '2022-06-02T15:09:22.000Z',
	status: 'Pendente',
	User: {
		name: 'Cliente Zé Birita'
	},
	Seller: {
		name: 'Fulana Pereira'
	},
	Products: [
		{
			id: 2,
			name: 'Heineken 600ml',
			price: 8,
			urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
			SaleProduct: {
				quantity: 2
			}
		},
		{
			id: 5,
			name: 'Skol 269ml',
			price: 2,
			urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
			SaleProduct: {
				quantity: 1
			}
		}
	]
};

const mockResultGetCustomerSales = [{
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 12.00,
  deliveryAddress:  'Rua dos Bobos, 7',
  deliveryNumber: '2010',
  status: 'Pendente',
  saleDate: '2020-05-31T19:14:41.000Z',
}, {
  id: 2,
  userId: 3,
  sellerId: 2,
  totalPrice: 8.99,
  deliveryAddress:  'Rua dos Bobos, 24',
  deliveryNumber: '2020',
  status: 'Pendente',
  saleDate: '2020-05-31T19:14:41.000Z',
} ]

const mockResultGetSellerSales = [{
  id: 1,
  userId: 3,
  sellerId: 1,
  totalPrice: 12.00,
  deliveryAddress:  'Rua dos Bobos, 7',
  deliveryNumber: '2010',
  status: 'Pendente',
  saleDate: '2020-05-31T19:14:41.000Z',
}, {
  id: 2,
  userId: 3,
  sellerId: 1,
  totalPrice: 8.99,
  deliveryAddress:  'Rua dos Bobos, 24',
  deliveryNumber: '2020',
  status: 'Pendente',
  saleDate: '2020-05-31T19:14:41.000Z',
} ]

module.exports = {
  mockResultGetSales,
  mockResultGetOneSale,
  mockResultGetCustomerSales,
  mockResultGetSellerSales,
}