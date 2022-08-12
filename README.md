# Projeto Delivery App

-- Aguarde um momento... o projeto está em manutenção, estou fazendo alguns ajustes para funcionar corretamente no navegador, mas logo logo estará 100% :D

-- Enquanto isso, fique a vontade para ver o código feito pelo grupo.

Projeto de conclusão do bloco de Back-end da [Trybe](https://www.betrybe.com). Trabalho realizado em grupo de 5 estudantes.
O grupo foi responsável por criar e integrar tanto o back-end quanto o front-end, criando uma plataforma de delivery de cerveja.

## Autores

* [Ana Luisa M. Simões](https://github.com/analuisams99).   
* [Luiz Fernando C. Módolo](https://github.com/LuizModolo).   
* [Matheus Oliveira Monteiro](https://github.com/Matheus-Mont).   
* [Raphael Taglialegna](https://github.com/RaphaelTaglialegna).   
* [Wendel Melo](https://github.com/wendeldemelo).   

## Stacks utilizadas

<strong>Front-end:</strong> JavaScript, React.js, Tailwind, Axios, Jest   
<strong>Back-end:</strong> JavaScript, Node.js, Express, Joi, Sequelize, Mocha/Chai   
<strong>DB:</strong> MySQL  

## Estruturação do projeto

#### A aplicação tem 4 fluxos principais
* Fluxo Comum:   
    (1) Tela de Login   
    (2) Tela de Registro

* Fluxo do Cliente:   
    (3) Tela de Produtos   
    (4) Tela de Checkout   
    (5) Tela de Pedidos   
    (6) Tela de Detalhes do Pedido   
    
* Fluxo da Pessoa Vendedora:   
    (7) Tela de Pedidos;   
    (8) Tela de Detalhes/Controle do Pedido   

* Fluxo da Pessoa Administradora:   
    (10) Tela de gerenciamento de usuários.   


#### A tela de login é capaz de direcionar para a tela principal de cada pessoa usuária, sendo as páginas:   
    Do cliente: /customer/products,   
    Da pessoa vendedora: /seller/orders,    
    Da pessoa administradora: /admin/manage    
    

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:analuisams99/project-delivery-app.git
```

Entre no diretório do projeto e abra ele no seu VSCode

```bash
  cd project-delivery-app
  code .
```

Instale as dependências na raiz do projeto
```bash
  npm run dev:prestart
```
Dentro da pasta de backend, crie um .env com suas informações, o app não irá funcionar sem ele. (Exemplo): 
```bash
NODE_ENV=development
API_PORT=3001
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=senhaDoDB
MYSQL_DB_NAME=delivery-app
EVAL_ALWAYS_RESTORE_DEV_DB=true
```

Inicie o servidor

```bash
  cd back-end
  npm db:reset
  npm run dev
  
  cd ..
  
  cd front-end
  npm start
```

Pronto! Agora você ja pode acessar o projeto pelo seu navegador



## Demonstração

Diagrama de ER
 ![diagrama](assets/readme/eer.png)
 
<div align="center">
  <div align="center">
    <p>Tela de fluxo do cliente</p>
    <img align="left" alt="fluxo-cliente" src="assets/readme/fluxoCliente.gif" width="80%"/>
    <img align="right" alt="fluxo-cliente-mob" src="assets/readme/cliente-mob.gif" width="20%"/>
  </div>
  
  <br>

  <div align="center">
    <p>Tela de fluxo do vendedor</p>
    <img align="left" alt="fluxo-vendedor" src="assets/readme/fluxoVendedor.gif" width="80%"/>
    <img align="right" alt="fluxo-vendedor-mob" src="assets/readme/vend-mob.gif" width="20%"/>
  </div>

<br>

  <div align="center">
    <p>Tela de fluxo do administrador</p>
    <img align="left" alt="fluxo-adm" src="assets/readme/fluxoAdmin.gif" width="80%"/>
    <img align="right" alt="fluxo-adm-mob" src="assets/readme/adm-mob.gif" width="20%"/>
  </div>
</div>
