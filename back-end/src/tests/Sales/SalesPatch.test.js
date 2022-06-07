const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { Sale, User } = require('../../database/models');
const { SUCCESSFULLY_MESSAGE_MOCK, INVALID_TOKEN } = require('../mocks/salesPatchMock');
const { usersDb } = require('../mocks/mockUserDb');
const { createToken } = require('../../middlewares/tokenAuth');
const server = require('./../../api/app');

chai.use(chaiHttp);

const token = createToken(usersDb[2]);
const { expect } = chai;

describe('Testa rotas PATCH de sales', () => {
  describe('se a requisição do PATCH /sales/delivered/:id funciona da maneira esperada', () => {
    let chaiHttpResponse;

    beforeEach(() => {
      sinon.stub(Sale, 'update').resolves({});
      sinon.stub(User, 'findOne').resolves(usersDb[2]);
    });

    afterEach(() => {
      Sale.update.restore();
      User.findOne.restore();
    });

    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/delivered/1').set({ authorization: token });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.a('string');
      expect(body.message).to.be.equal(SUCCESSFULLY_MESSAGE_MOCK);
    });

    it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/delivered/1').set({ authorization: INVALID_TOKEN });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(401);
      expect(body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/delivered/1').set({ x: 'x' });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(404);
      expect(body).to.have.property('message').eql('Token not found');
    });
  });
  describe('se a requisição do PATCH /sales/prepare/:id funciona da maneira esperada', () => {
    let chaiHttpResponse;

    beforeEach(() => {
      sinon.stub(Sale, 'update').resolves({});
      sinon.stub(User, 'findOne').resolves(usersDb[2]);
    });

    afterEach(() => {
      Sale.update.restore();
      User.findOne.restore();
    });

    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/prepare/1').set({ authorization: token });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.a('string');
      expect(body.message).to.be.equal(SUCCESSFULLY_MESSAGE_MOCK);
    });

    it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/prepare/1').set({ authorization: INVALID_TOKEN });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(401);
      expect(body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/prepare/1').set({ x: 'x' });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(404);
      expect(body).to.have.property('message').eql('Token not found');
    });
  });

  describe('se a requisição do PATCH /sales/todeliver/:id funciona da maneira esperada', () => {
    let chaiHttpResponse;

    beforeEach(() => {
      sinon.stub(Sale, 'update').resolves({});
      sinon.stub(User, 'findOne').resolves(usersDb[2]);
    });

    afterEach(() => {
      Sale.update.restore();
      User.findOne.restore();
    });

    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/todeliver/1').set({ authorization: token });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.a('string');
      expect(body.message).to.be.equal(SUCCESSFULLY_MESSAGE_MOCK);
    });

    it('se o endpoint retorna uma mensagem de erro o token é inválido', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/todeliver/1').set({ authorization: INVALID_TOKEN });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(401);
      expect(body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      chaiHttpResponse = await chai.request(server).patch('/sales/todeliver/1').set({ x: 'x' });
      const { body } = chaiHttpResponse;

      expect(chaiHttpResponse).to.have.status(404);
      expect(body).to.have.property('message').eql('Token not found');
    });
  });
});

