const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');


const server = require('./../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const { Sales } = require('../database/models');

chai.use(chaiHttp);

describe('se a requisição do get /tasks funciona da maneira esperada', () => {
  let chaiHttpResponse;

  before(() => {
    sinon.stub(Sales, 'create')
        .resolves({
          id: 1,
          userId: 1,
          selerId: 1,
          totalPrice: 3.30,
          deliveryAddress:  'Rua dos Bobos, 0',
          deliveryNumber: '123456789',
          status: 'Em preparação',
          saleDate: '2020-05-31T19:14:41.000Z',

        });
});

after(() => {
    Sales.create.restore();
});

  it('se o endpoint retorna o objeto esperado dada uma requisição correta', async () => {
    chaiHttpResponse = await chai.request(server).get('/tasks');
    const {body} = chaiHttpResponse;
    console.log(body)
    expect(chaiHttpResponse).to.have.status(200);
    expect(body.length).to.be.equal(2);
    expect(body[0]).to.have.property('id');
    expect(body[0].id).to.be.a('number');
    expect(body[0]).to.have.property('title');
    expect(body[0]).to.have.property('description');
    expect(body[0]).to.have.property('createdAt');
    expect(body[0]).to.have.property('updatedAt');
    expect(body[0].title).to.be.a('string');
    expect(body[0].description).to.be.a('string');
    expect(body[0].status).to.be.a('string');
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita de maneira incorreta', async () => {
    chaiHttpResponse = await chai.request(server).get('/tasksa');
    expect(chaiHttpResponse).to.have.status(404);
  });

});

describe('se a requisição do post /tasks/id funciona da maneira esperada', () => {
  let chaiHttpResponse;

  before(() => {
    sinon.stub(Task, 'findOne')
        .resolves(undefined);
});

after(() => {
    Task.findOne.restore();
});

  it('se o endpoint retorna o erro esperado dada uma requisição vazia', async () => {
    chaiHttpResponse = await chai.request(server).put('/tasks/10').send( {
    title: "Checar redes sociais do criador",
		description: "e até já! <3",
		status: "pendente"
  });
    const {message} = chaiHttpResponse;
    console.log(message)
    expect(chaiHttpResponse).to.have.status(406);
  });

  it('se o endpoint retorna uma mensagem de erro quando a requisição é feita de maneira incorreta', async () => {
    chaiHttpResponse = await chai.request(server).put('/tasks/10').send( {
      description: "e até já! <3",
      status: "pendente"
    });
    expect(chaiHttpResponse).to.have.status(400);
  });

});
