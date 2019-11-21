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
const jasmine = require('jasmine');

const expect = chai.expect;
chai.use(chaiHttp);


const userSaved = new Usuario({
  nome: 'testdude',
  latitude: 666,
  longitude: 666
});

describe('Requests de Usuario', function () {
  beforeEach(function (done) { //Before each test we empty the database
    Usuario.deleteMany({}, (err) => {
      done();
    });
  });
  describe('/Get', function () {
    it('should return an array of users', function (done) {
      chai.request(server)
        .get('/usuario')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.eql(0);//Now passing cause of the hook
          done();
        });
    });
  });
  describe('/Get:id', function () {
    it('Should return an specific user by id', function (done) {
      userSaved.save((err, user) => {
        chai.request(server)
          .get('/usuario/' + user.id)
          .send(user)
          .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body._id).to.be.eql(user.id);
            done();
          });
      });
    });
  });
  describe('/Post', function () {
    it('Should post a new user', function (done) {
      let user = {
        nome: 'user',
        latitude: 123,
        longitude: 321
      }
      chai.request(server)
        .post('/usuario')
        .send(user)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('Should NOT post a new user without name', function (done) {
      let user = {
        latitude: 123,
        longitude: 321
      }
      chai.request(server)
        .post('/usuario')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(206);
          expect(res.body.message).to.eql('Missing field validation error');
          done();
        });
    });
  });

  describe('/Update', (done) => {
    const oldUser = new Usuario({
      nome: 'testdude',
      latitude: 666,
      longitude: 666
    });

    let usuario = {
      nome: 'user',
      latitude: 123,
      longitude: 321
    }

    it('should update a user given the id', (done) => {
      let newUser = {
        nome: 'userAtualizado',
        latitude: 123,
        longitude: 321
      };
      oldUser.save((err, user) => {
        chai.request(server).put('/usuario/' + user.id).send(newUser).end((err,res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.nome).to.be.eql(newUser.nome)
          expect(res.body.latitude).to.be.eql(newUser.latitude)
          expect(res.body.longitude).to.be.eql(newUser.longitude)
          done();
        })
      })
    });

    it('should not update a user given the id with empty content', (done) => {
      const invalidUser = {
        nome: null,
        latitude: 123,
        longitude: 321
      }
      oldUser.save((err, user) => {
        chai.request(server).put('/usuario/' + user.id).send(invalidUser).end((err,res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.be.eql('Content cannot be empty');
          done();
        })
      })
    });

    it('should not update a user given the invalid id', (done) => { 
      jasmine.spyOn()

      oldUser.save((err, user) => {
        chai.request(server).put('/usuario/' + 'idInvalidooooooooooo').send(usuario).end((err,res) => {
          
          expect(res).to.have.status(404);
          expect(res.body.message).to.be.eql('Usuario not found with id idInvalidooooooooooo');
          done();
        })
      })
    });
  });
});
