const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('./../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const { Sale, SaleProduct, User } = require('../../database/models');

const {mockSale, mockSaleResponse, mockSaleWrong} = require('../mocks/SalesPostMocks');
const { usersDb } = require('../mocks/mockUserDb');
const { createToken } = require('../../middlewares/tokenAuth');

describe('Testa rota POST /sales', () => {
  let chaiHttpResponse;

  before(() => {
    sinon.stub(Sale, 'create')
    sinon.stub(User, 'findOne').resolves(usersDb[0]);
    sinon.stub(SaleProduct, 'create').resolves({});
  });

  after(() => {
    Sale.create.restore();
    User.findOne.restore();
    SaleProduct.create.restore();
  });

  it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
    (Sale.create).resolves(mockSaleResponse);

    const token = createToken(usersDb[0]);
    
    chaiHttpResponse = await chai.request(server).post('/sales').send(mockSale)
      .set({'authorization': token, schema: 'salesSchema'});

    const { body } = chaiHttpResponse;
  
    expect(chaiHttpResponse).to.have.status(201);
    expect(body).to.have.property('id');
    expect(body.id).to.be.a('number');
    expect(body).to.have.property('sellerId');
    expect(body).to.have.property('userId');
    expect(body).to.have.property('deliveryAddress');
    expect(body).to.have.property('deliveryNumber');
    expect(body).to.have.property('totalPrice');
    expect(body).to.have.property('status');
    expect(body).to.have.property('saleDate');
    expect(body.totalPrice).to.be.a('number');
    expect(body.deliveryAddress).to.be.a('string');
    expect(body.status).to.be.a('string');
    expect(body.status).to.be.equal('Pendente');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem um dos campos obrigatórios do body (userId)', async () => {
    const token = createToken(usersDb[0]);
    chaiHttpResponse = await chai.request(server).post('/sales').send(mockSaleWrong)
      .set({'authorization': token, schema: 'salesSchema'});

    expect(chaiHttpResponse).to.have.status(400);

    const { body } = chaiHttpResponse;
    expect(chaiHttpResponse).to.have.status(400);
    expect(body.message).to.be.equal('"userId" is a required field');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem o header schema', async () => {
    const token = createToken(usersDb[0]);
    chaiHttpResponse = await chai.request(server).post('/sales').send(mockSaleWrong)
      .set({'authorization': token });

      const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(400);
    expect(body.message).to.be.equal('Header must be valid');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem um token válido', async () => {
    chaiHttpResponse = await chai.request(server).post('/sales').send(mockSaleWrong)
      .set({'authorization': 'token', schema: 'salesSchema'});

      
    const { body } = chaiHttpResponse;
      
    expect(chaiHttpResponse).to.have.status(401);
    expect(body.message).to.be.equal('Token invalid');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem um token ', async () => {
    chaiHttpResponse = await chai.request(server).post('/sales').send(mockSaleWrong)
      .set({ schema: 'salesSchema'});

      
    const { body } = chaiHttpResponse;
      
    expect(chaiHttpResponse).to.have.status(404);
    expect(body.message).to.be.equal('Token not found');
  });

});

