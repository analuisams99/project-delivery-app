const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');


const server = require('../../api/app');
const { Product, User } = require('../../database/models');
const { createToken } = require('../../middlewares/tokenAuth');
const userData = require('../mocks/mockUserDb');

chai.use(chaiHttp);

const { expect } = chai;

const token = createToken(userData[2]);
const invalidToken = 'ndghudfhbf87gf89d7g89fd7ghdfg';

const mockResultGetProducts = [{
  id: 1,
  name: 'Skol Lata 250ml',
  price: 2,
  url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
}, {
  id: 2,
  name: 'Heineken 600ml',
  price: 8,
  url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
} ]

describe('Testando as rotas Get da camada Products', () => {
  describe('teste da requisição GET /products', () => {
    beforeEach(() => {
      sinon.stub(Product, 'findAll')
      sinon.stub(User, 'findOne')
    });
  
    afterEach(() => {
      Product.findAll.restore();
      User.findOne.restore();
    });
  
    it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
      (Product.findAll).resolves(mockResultGetProducts);
      (User.findOne).resolves(userData[2]);
      
      const res = await chai.request(server)
        .get('/products')
        .set({ authorization: token });
  
      expect(res.status).equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(2);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0].id).to.be.a('number');
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('price');
      expect(res.body[0]).to.have.property('url_image');
      expect(res.body[0].price).to.be.a('number');
      expect(res.body[0].name).to.be.a('string');
      expect(res.body[0].url_image).to.be.a('string');
    });
  
    it('se o endpoint retorna uma mensagem de erro quando o token é inválido', async () => {
      (Product.findAll).resolves(mockResultGetProducts);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/products')
        .set({ authorization: invalidToken });

        expect(res.status).equal(401);
        expect(res.body).to.have.property('message').eql('Token invalid');
    });

    it('se o endpoint retorna uma mensagem de erro quando não recebe token', async () => {
      (Product.findAll).resolves(mockResultGetProducts);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/products')
        .set({ x: 'x' });

        expect(res.status).equal(404);
        expect(res.body).to.have.property('message').eql('Token not found');
    });

    it('se o endpoint retorna uma mensagem de erro ao não receber o esperado do BD', async () => {
      (Product.findAll).resolves(null);
      (User.findOne).resolves(userData[2]);
      const res = await chai.request(server)
        .get('/products')
        .set({ authorization: token });

        expect(res.status).equal(404);
        expect(res.body).to.have.property('message').eql('Erro ao listar produtos');
    });
  });
});
