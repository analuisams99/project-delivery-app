const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');

const app = require('../../api/app');
const { findUserMock, loginValid, loginInvalid } = require('../mocks/mocksUsersTest');

chai.use(chaiHttp);

const { expect } = chai;


describe('Testando o Login do usuário', () => {
  let res;
  describe('Acessando a rota `/login` requisição do tipo POST fazendo um login válido.', () => {
    before(async () => {
      sinon.stub(User, 'findOne')
        .resolves(findUserMock);
    });
    
    after(() => {
      (User.findOne).restore();
    });
    
    it('Espera no corpo da resposta STATUS 200 e um token no corpo da resposta', async () => {
      res = await chai.request(app)
      .post('/login')
      .set({ schema: 'loginSchema' })
      .send(loginValid);

      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.own.property('token');
    });
  }); 

  describe('Acessando a rota `/login` requisição do tipo POST fazendo um login válido.', () => {
    before(async () => {
      sinon.stub(User, 'findOne')
        .resolves(findUserMock);
    });
    
    after(() => {
      (User.findOne).restore();
    });
    
    it('Espera no corpo da resposta STATUS 200 e um token no corpo da resposta', async () => {
      res = await chai.request(app)
      .post('/login')
      .set({ schema: 'loginSchema' })
      .send(loginInvalid);
      
      expect(res.status).to.be.equal(400);
      expect(res.body).to.have.own.property('error');
    });
  });    
});
