/*
Testes de unidade visando a corretude dos metodos encontrados em controler.
Como os metodos em UsuarioController sao todos assincronos, a gente vai deixar
eles para depois, e como Validation so lida com estruturas de dados, vamos
para verifyToken
*/

process.env.NODE_ENV = 'test'; //Set env variable to test

const Usuario = require('../src/models/Usuario.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server.js');
const mongoose = require('mongoose');
const usuarioController = require('../src/controllers/UsuarioController.js');
//const should = require('should');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Requests de Usuario', function(){
/*  beforeEach(function(done){ //Before each test we empty the database
        Usuario.remove({}, (err) => {
           done();
        });
    });*/
  describe('/Get all users', function(){
    it('should return an array of users', function(done){
      chai.request(server)
          .get('/usuario')
          .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            //expect(res.body.length).to.be.eql(0);
            done();
          });
    });
    describe('/Post', function(){
      it('should create a new user', function(done){
        let user = {
          nome: 'user',
          latitude: 123,
          longitude: 321
        }
        chai.request(server)
            .post('/usuario')
            .send(user)
            .end(function(err, res){
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              done();
            });
      });
    });
  });
});
