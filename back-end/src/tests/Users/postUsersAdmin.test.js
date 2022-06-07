const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('./../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const { User } = require('../../database/models');
const { createToken } = require('../../middlewares/tokenAuth');
const { usersDb } = require('../mocks/mockUserDb');

const token = createToken(usersDb[0]);

const mockUser = {
  name: 'chico anisio',
  email: 'chico@deliveryapp.com',
  password: 'abc123456',
};

const mockUserAdm = {
  name: 'chico anisio',
  email: 'chico@deliveryapp.com',
  password: 'abc123456',
  role: 'administrator',
};

const mockUserWrong = {
  name: 'chico anisio',
  password: 'abc123456',
};

describe('Testa a rota POST /users/admin', () => {
  let chaiHttpResponse;

  before(() => {
    sinon.stub(User, 'create')
  });

  after(() => {
    User.create.restore();
  });

  it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
    (User.create).resolves(usersDb[0]);

    const token = createToken(usersDb[0]);

    chaiHttpResponse = await chai
      .request(server)
      .post('/users/admin')
      .send(mockUserAdm)
      .set({ 'authorization': token, schema: 'adminSchema' });

    const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(201);
    expect(body).to.have.property('id');
    expect(body.id).to.be.a('number');
    expect(body).to.have.property('name');
    expect(body).to.have.property('email');
    expect(body).to.have.property('password');
    expect(body).to.have.property('role');
    expect(body.name).to.be.a('string');
    expect(body.email).to.be.a('string');
    expect(body.password).to.be.a('string');
    expect(body.role).to.be.equal('administrator');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem um dos campos obrigatórios do body (email)', async () => {
    chaiHttpResponse = await chai
      .request(server)
      .post('/users/admin')
      .send(mockUserWrong)
      .set({'authorization': token, schema: 'adminSchema'});

    const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(400);
    expect(body.message).to.be.equal('"email" is a required field');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem o header schema', async () => {
    chaiHttpResponse = await chai
      .request(server)
      .post('/users/admin')
      .send(mockUser)
      .set({'authorization': token });

      const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(400);
    expect(body.message).to.be.equal('Header must be valid');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem um token válido', async () => {
    chaiHttpResponse = await chai.request(server).post('/users/admin').send(mockUserWrong)
      .set({'authorization': 'token', schema: 'adminSchema'});


    const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(401);
    expect(body.message).to.be.equal('Token invalid');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem um token ', async () => {
    chaiHttpResponse = await chai.request(server).post('/users/admin').send(mockUserWrong)
      .set({ schema: 'adminSchema'});


    const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(404);
    expect(body.message).to.be.equal('Token not found');
  });
});
