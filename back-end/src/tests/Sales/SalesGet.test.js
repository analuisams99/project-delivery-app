const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');


const server = require('./../../api/app');
const { Sale } = require('../../database/models');

chai.use(chaiHttp);

const { expect } = chai;

// const mockBodyGetSale = [{
//   userId: 1,
//   sellerId: 3,
//   totalPrice: 12.00,
//   deliveryAddress:  'Rua dos Bobos, 7',
//   deliveryNumber: '2010',
//   products: [{productId: 7, quantity: 3}, {productId: 3, quantity: 1}]
// }, {
//   userId: 2,
//   sellerId: 3,
//   totalPrice: 8.99,
//   deliveryAddress:  'Rua dos Bobos, 24',
//   deliveryNumber: '2020',
//   products: [{productId: 2, quantity: 4}]
// }];

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

const mockResultGetCostumerSales = [{
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

describe('Testando as rotas Get da camada Sales', () => {
  describe('teste da requisição GET /sales', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findAll')
    });
  
    afterEach(() => {
        Sale.findAll.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findAll).resolves(mockResultGetSales);
      const res = await chai.request(server)
        .get('/sales');
  
      expect(res.status).equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(2);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0].id).to.be.a('number');
      expect(res.body[0]).to.have.property('sellerId');
      expect(res.body[0]).to.have.property('userId');
      expect(res.body[0]).to.have.property('deliveryAddress');
      expect(res.body[0]).to.have.property('deliveryNumber');
      expect(res.body[0]).to.have.property('totalPrice');
      expect(res.body[0]).to.have.property('status');
      expect(res.body[0]).to.have.property('saleDate');
      expect(res.body[0].totalPrice).to.be.a('number');
      expect(res.body[0].deliveryAddress).to.be.a('string');
      expect(res.body[0].status).to.be.a('string');
      expect(res.body[0].status).to.be.equal('Pendente');
    });
  
    // it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
    //   chaiHttpResponse = await chai.request(server).get('/tasksa');
    //   expect(chaiHttpResponse).to.have.status(404);
    // });
  });

  describe('teste da requisição GET /sales/id', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findOne')
    });
  
    afterEach(() => {
        Sale.findOne.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findOne).resolves(mockResultGetOneSale);
      const res = await chai.request(server)
        .get('/sales/3');
  
      expect(res.status).equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('id');
      expect(res.body.id).to.be.a('number');
      expect(res.body).to.have.property('sellerId');
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('saleDate');
      expect(res.body.totalPrice).to.be.a('number');
      expect(res.body.status).to.be.a('string');
      expect(res.body.status).to.be.equal('Pendente');
      expect(res.body).to.have.property('User');
      expect(res.body.User).to.be.a('object');
      expect(res.body.User).to.have.property('name');
      expect(res.body).to.have.property('Seller');
      expect(res.body.Seller).to.be.a('object');
      expect(res.body.Seller).to.have.property('name');
      expect(res.body).to.have.property('Products');
      expect(res.body.Products).to.be.a('array');
      expect(res.body.Products).to.have.length(2);
      expect(res.body.Products[0]).to.have.property('id');
      expect(res.body.Products[0]).to.have.property('urlImage');
      expect(res.body.Products[0]).to.have.property('SaleProduct');
    });
  
    // it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
    //   chaiHttpResponse = await chai.request(server).get('/tasksa');
    //   expect(chaiHttpResponse).to.have.status(404);
    // });
  });

  describe('teste da requisição GET /sales/costumer/id', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findAll')
    });
  
    afterEach(() => {
        Sale.findAll.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findAll).resolves(mockResultGetCostumerSales);
      const res = await chai.request(server)
        .get('/sales/costumer/3');
  
      expect(res.status).equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(2);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0].id).to.be.a('number');
      expect(res.body[0]).to.have.property('sellerId');
      expect(res.body[0]).to.have.property('userId');
      expect(res.body[0]).to.have.property('deliveryAddress');
      expect(res.body[0]).to.have.property('deliveryNumber');
      expect(res.body[0]).to.have.property('totalPrice');
      expect(res.body[0]).to.have.property('status');
      expect(res.body[0]).to.have.property('saleDate');
      expect(res.body[0].totalPrice).to.be.a('number');
      expect(res.body[0].deliveryAddress).to.be.a('string');
      expect(res.body[0].status).to.be.a('string');
      expect(res.body[0].status).to.be.equal('Pendente');
    });
  
    // it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
    //   chaiHttpResponse = await chai.request(server).get('/tasksa');
    //   expect(chaiHttpResponse).to.have.status(404);
    // });
  });

  describe('teste da requisição GET /sales/seller/id', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findAll')
    });
  
    afterEach(() => {
        Sale.findAll.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findAll).resolves(mockResultGetSellerSales);
      const res = await chai.request(server)
        .get('/sales/seller/1');
  
      expect(res.status).equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(2);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0].id).to.be.a('number');
      expect(res.body[0]).to.have.property('sellerId');
      expect(res.body[0]).to.have.property('userId');
      expect(res.body[0]).to.have.property('deliveryAddress');
      expect(res.body[0]).to.have.property('deliveryNumber');
      expect(res.body[0]).to.have.property('totalPrice');
      expect(res.body[0]).to.have.property('status');
      expect(res.body[0]).to.have.property('saleDate');
      expect(res.body[0].totalPrice).to.be.a('number');
      expect(res.body[0].deliveryAddress).to.be.a('string');
      expect(res.body[0].status).to.be.a('string');
      expect(res.body[0].status).to.be.equal('Pendente');
    });
  
    // it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
    //   chaiHttpResponse = await chai.request(server).get('/tasksa');
    //   expect(chaiHttpResponse).to.have.status(404);
    // });
  });
  
});

