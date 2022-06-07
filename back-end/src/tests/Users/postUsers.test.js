const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('./../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const { User } = require('../../database/models');
const { createToken } = require('../../middlewares/tokenAuth');
const { usersDb } = require('../mocks/mockUserDb');

const token = createToken(usersDb[2]);

const mockUser = {
  name: 'chico anisio',
  email: 'chico@deliveryapp.com',
  password: 'abc123456',
};

const mockUserWrong = {
  name: 'chico anisio',
  password: 'abc123456',
};

describe('Testa a rota POST /users', () => {
  let chaiHttpResponse;

  before(() => {
    sinon.stub(User, 'create')
  });

  after(() => {
    User.create.restore();
  });

  it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
    (User.create).resolves(usersDb[2]);

    chaiHttpResponse = await chai
      .request(server)
      .post('/users')
      .send(mockUser)
      .set({'authorization': token, schema: 'newUserSchema'});

    const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(201);
    expect(body).to.have.property('token');
    expect(body.token).to.be.a('string');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem um dos campos obrigatórios do body (email)', async () => {
    chaiHttpResponse = await chai
      .request(server)
      .post('/users')
      .send(mockUserWrong)
      .set({'authorization': token, schema: 'newUserSchema'});

    const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(400);
    expect(body.message).to.be.equal('"email" is a required field');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita sem o header schema', async () => {
    chaiHttpResponse = await chai
      .request(server)
      .post('/users')
      .send(mockUser)
      .set({'authorization': token });

      const { body } = chaiHttpResponse;

    expect(chaiHttpResponse).to.have.status(400);
    expect(body.message).to.be.equal('Header must be valid');
  });
});
