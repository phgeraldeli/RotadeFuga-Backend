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
  beforeEach(function(done){ //Before each test we empty the database
        Usuario.deleteMany({}, (err) => {
           done();
        });
    });
  describe('/Get', function(){
    it('should return an array of users', function(done){
      chai.request(server)
          .get('/usuario')
          .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(0);//Now passing cause of the hook
            done();
          });
    });
    describe('/Post', function(){
      it('Should post a new user', function(done){
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
      /*it('Should NOT post a new user without name', function(done){
        let user = {
          latitude: 123,
          longitude: 321
        }
        chai.request(server)
            .post('/usuario')
            .send(user)
            .end(function(err, res){
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('errors');
              expect(res.body.errors).to.have.property('pages');
              expect(res.body.errors.pages).to.have.property('nome').eql('required');
              done();
            });
      });//Deprecado, precisa fazer throw e catch ValidationError aqui
      */
    });
    describe('/Get:id', function(){
      it('Should return an specific user by id', function(done){
        let user = new Usuario({nome: 'testdude', latitude: 666, longitude: 666});
        user.save((err, book) => {
          chai.request(server)
              .get('/usuario/'+ user.id)
              .send(user)
              .end(function(err, res){
                expect(res).to.have.status(200);
                expect(res.body._id).to.be.eql('user.id');//AssertionError
          });
        });
      });
    });
  });
});
