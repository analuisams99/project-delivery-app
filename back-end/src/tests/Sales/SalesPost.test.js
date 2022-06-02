const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('./../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const { Sale, SaleProduct } = require('../../database/models');

const mockSale = {
  userId: 1,
  sellerId: 3,
  totalPrice: 12.00,
  deliveryAddress:  "Rua dos Bobos, 2",
  deliveryNumber: "987654321",
  products: [{productId: 7, quantity: 3}, {productId: 3, quantity: 1}]
};

describe('se a requisição do POST /sales funciona da maneira esperada', () => {
  let chaiHttpResponse;

  before(() => {
    sinon.stub(Sale, 'create')
      .resolves({
        id: 1,
        userId: 1,
        sellerId: 1,
        totalPrice: 3.30,
        deliveryAddress:  'Rua dos Bobos, 0',
        deliveryNumber: '123456789',
        status: 'Pendente',
        saleDate: '2020-05-31T19:14:41.000Z',
      });
      sinon.stub(SaleProduct, 'create').resolves({});
  });

  after(() => {
    Sale.create.restore();
    SaleProduct.create.restore();
  });

  it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
    chaiHttpResponse = await chai.request(server).post('/sales').send(mockSale);
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

  // it('se o endpoint retorna uma mensagem de erro quando a requisição é feita de maneira incorreta', async () => {
  //   chaiHttpResponse = await chai.request(server).get('/tasksa');
  //   expect(chaiHttpResponse).to.have.status(404);
  // });

});

