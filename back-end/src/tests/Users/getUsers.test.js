const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');

const app = require('../../api/app');

const { usersDb } = require('../mocks/mockUserDb');
const { adminUser, customerUser } = require('../mocks/mocksUsersTest');
const { createToken } = require('../../middlewares/tokenAuth');

chai.use(chaiHttp);

const { expect } = chai;

const TOKEN_ADMIN = createToken(adminUser);

const TOKEN_CUSTOMER = createToken(customerUser);


describe('Testando a Rota GET para buscar todos os usuários.', () => {
  let res;
  describe('Acessando a rota `/users` requisição do tipo GET fazendo com um token de Adminstrador.', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne')
        .resolves(adminUser);
      sinon.stub(User, 'findAll')
        .resolves(usersDb);
    });
    
    afterEach(() => {
      (User.findOne).restore();
      (User.findAll).restore();
    });
    
    it('Espera no corpo da resposta STATUS 200', async () => {
      res = await chai.request(app).get('/users').set({authorization: TOKEN_ADMIN })
      
      expect(res.status).to.be.equal(200);
    });

    it('Espera no corpo da resposa um Array com objetos que tenham os campos id, name, email e role apenas.', async () => {
      res = await chai.request(app)
      .get('/users')
      .set({authorization: TOKEN_ADMIN })
      
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.own.property('id');
        expect(res.body[0]).to.have.own.property('name');
        expect(res.body[0]).to.have.own.property('email');
        expect(res.body[0]).to.have.own.property('role');
        expect(res.body[0]).to.not.have.own.property('password');
        
      });
  });


  describe('Acessando a rota `/users` requisição do tipo GET fazendo com um token de Cliente.', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne')
        .resolves(customerUser);
      sinon.stub(User, 'findAll')
        .resolves(usersDb);
    });
    
    afterEach(() => {
      (User.findOne).restore();
      (User.findAll).restore();
    });
    
    it('Espera no corpo da resposta STATUS 401 e uma message.', async () => {
      res = await chai.request(app).get('/users').set({authorization: TOKEN_CUSTOMER })
      
      expect(res.status).to.be.equal(401);
      expect(res.body).to.have.own.property('message');
    });    
  }); 

  describe('Acessando a rota `/users` requisição do tipo GET fazendo com um token Válido mas sem dados no banco..', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne')
      .resolves(adminUser);
      sinon.stub(User, 'findAll')
        .resolves(null);
  });
  
    afterEach(() => {
      (User.findOne).restore();
      (User.findAll).restore();
      });
    
    it('Espera no corpo da resposta STATUS 400 e uma message.', async () => {
      res = await chai.request(app).get('/users').set({authorization: TOKEN_ADMIN })
      
      expect(res.status).to.be.equal(400);
      expect(res.body).to.have.own.property('message');
    });    
  });    
});
