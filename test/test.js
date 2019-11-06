/*
Testes de unidade visando a corretude dos metodos encontrados em controler.
Como os metodos em UsuarioController sao todos assincronos, a gente vai deixar
eles para depois, e como Validation so lida com estruturas de dados, vamos
para verifyToken
*/

process.env.NODE_ENV = 'test'; //Set env variable to test

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server.js');
const mongoose = require('mongoose');
const usuarioController = require('../src/controllers/UsuarioController.js');
//const should = require('should');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Requests de Usuario', function(){
/*  beforeEach((done) => { //Before each test we empty the database
        usuarioController.delete({}, (err) => {
           done();
        });
    });*/
  describe('/Get all users', function(){
    it('should return an empty array of users', function(done){
      chai.request(server)
          .get('/usuario')
          .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            //expect(res.body.length).to.be.eql(0);
            done();
          });
    });
  });
});
