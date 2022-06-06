const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('./../../api/app');
const { Sale, User } = require('../../database/models');
const userData = require('../mocks/mockUserDb');
const { createToken } = require('../../middlewares/tokenAuth');
const { 
  mockResultGetCostumerSales,
  mockResultGetSellerSales,
  mockResultGetOneSale,
  mockResultGetSales 
} = require('../mocks/mockGetSalesTest');

chai.use(chaiHttp);

const { expect } = chai;

const token = createToken(userData[2]);
const invalidToken = 'ndghudfhbf87gf89d7g89fd7ghdfg';

describe('Testando as rotas Get da camada Sales', () => {
  describe('teste da requisição GET /sales', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findAll');
      sinon.stub(User, 'findOne');
    });
  
    afterEach(() => {
        Sale.findAll.restore();
        User.findOne.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findAll).resolves(mockResultGetSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales')
        .set({ authorization: token });
  
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
  
    it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
      (Sale.findAll).resolves(mockResultGetSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales')
        .set({ authorization: invalidToken });

        expect(res.status).equal(401);
        expect(res.body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      (Sale.findAll).resolves(mockResultGetSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales')
        .set({ x: 'x' });

        expect(res.status).equal(404);
        expect(res.body).to.have.property('message').eql('Token not found');
    });

    it('se o endpoint retorna uma erro ao não receber resposta do BD', async () => {
      (Sale.findAll).resolves(null);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales')
        .set({ authorization: token });

        expect(res.status).equal(400);
        expect(res.body).to.have.property('error');
    });
  });

  describe('teste da requisição GET /sales/id', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findOne')
      sinon.stub(User, 'findOne');
    });
  
    afterEach(() => {
        Sale.findOne.restore();
        User.findOne.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findOne).resolves(mockResultGetOneSale);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/3')
        .set({ authorization: token });
  
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
  
    it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
      (Sale.findOne).resolves(mockResultGetOneSale);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/3')
        .set({ authorization: invalidToken });

        expect(res.status).equal(401);
        expect(res.body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      (Sale.findOne).resolves(mockResultGetOneSale);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/3')
        .set({ x: 'x' });

        expect(res.status).equal(404);
        expect(res.body).to.have.property('message').eql('Token not found');
    });

    it('se o endpoint retorna uma erro ao não receber resposta do BD', async () => {
      (Sale.findOne).resolves(null);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/3')
        .set({ authorization: token });

        expect(res.status).equal(400);
        expect(res.body).to.have.property('error');
    });
  });

  describe('teste da requisição GET /sales/costumer/id', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findAll');
      sinon.stub(User, 'findOne');
    });
  
    afterEach(() => {
        Sale.findAll.restore();
        User.findOne.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findAll).resolves(mockResultGetCostumerSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/costumer/3')
        .set({ authorization: token });
  
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
  
    it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
      (Sale.findAll).resolves(mockResultGetCostumerSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/costumer/3')
        .set({ authorization: invalidToken });

        expect(res.status).equal(401);
        expect(res.body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      (Sale.findAll).resolves(mockResultGetCostumerSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/costumer/3')
        .set({ x: 'x' });

        expect(res.status).equal(404);
        expect(res.body).to.have.property('message').eql('Token not found');
    });

    it('se o endpoint retorna uma erro ao não receber resposta do BD', async () => {
      (Sale.findAll).resolves(null);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/costumer/3')
        .set({ authorization: token });

        expect(res.status).equal(400);
        expect(res.body).to.have.property('error');
    });
  });

  describe('teste da requisição GET /sales/seller/id', () => {
    beforeEach(() => {
      sinon.stub(Sale, 'findAll');
      sinon.stub(User, 'findOne');
    });
  
    afterEach(() => {
        Sale.findAll.restore();
        User.findOne.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Sale.findAll).resolves(mockResultGetSellerSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/seller/1')
        .set({ authorization: token });
  
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
  
    it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
      (Sale.findAll).resolves(mockResultGetSellerSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/seller/1')
        .set({ authorization: invalidToken });

        expect(res.status).equal(401);
        expect(res.body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      (Sale.findAll).resolves(mockResultGetSellerSales);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/seller/1')
        .set({ x: 'x' });

        expect(res.status).equal(404);
        expect(res.body).to.have.property('message').eql('Token not found');
    });

    it('se o endpoint retorna uma erro ao não receber resposta do BD', async () => {
      (Sale.findAll).resolves(null);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/sales/seller/1')
        .set({ authorization: token });

        expect(res.status).equal(400);
        expect(res.body).to.have.property('error');
    });
  });
  
});

