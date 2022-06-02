const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('./../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const { Sale } = require('../../database/models');

const SUCCESSFULLY_MESSAGE_MOCK = 'Successfully updated';

describe('Testa rotas PATCH de sales', () => {
  describe('se a requisição do PATCH /sales/delivered/:id funciona da maneira esperada', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(Sale, 'update').resolves({});
    });

    after(() => {
      Sale.update.restore();
    });

    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/delivered/1');
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.a('string');
      expect(body.message).to.be.equal(SUCCESSFULLY_MESSAGE_MOCK);
    });
  });
  describe('se a requisição do PATCH /sales/prepare/:id funciona da maneira esperada', () => {
    let chaiHttpResponse;
  
    before(() => {
      sinon.stub(Sale, 'update').resolves({});
    });

    after(() => {
      Sale.update.restore();
    });

    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/prepare/1');
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.a('string');
      expect(body.message).to.be.equal(SUCCESSFULLY_MESSAGE_MOCK);
    });
  });
  describe('se a requisição do PATCH /sales/todeliver/:id funciona da maneira esperada', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(Sale, 'update').resolves({});
    });

    after(() => {
      Sale.update.restore();
    });

    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/todeliver/1');
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.a('string');
      expect(body.message).to.be.equal(SUCCESSFULLY_MESSAGE_MOCK);
    });
  });
});

