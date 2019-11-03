/*
Testes de unidade visando a corretude dos metodos encontrados em controler.
Como os metodos em UsuarioController sao todos assincronos, a gente vai deixar
eles para depois, e como Validation so lida com estruturas de dados, vamos
para verifyToken
*/
//const jwt = require("jsonwebtoken");
//var verify = require('../controllers/verifyToken.js');
var should = require("chai").should();//Tbm tem should e expect
var assert = require("chai").assert;
/*describe('Controller Tests', function(){    //Iniciando teste para o controller
  describe('VerifyToken Tests', function(){  //Iniciando teste para Validation.js
    it('Should return a token', function(done){
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      should.exist(token);
    });
  });
});
*/
describe("test", function(){
  describe("test", function(){
    it("should fucking work", function(){
      assert.equal(1, 1);
    });
  });
});
