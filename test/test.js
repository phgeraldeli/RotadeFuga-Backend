/*
Testes de unidade visando a corretude dos metodos encontrados em controler.
Como os metodos em UsuarioController sao todos assincronos, a gente vai deixar
eles para depois, e como Validation so lida com estruturas de dados, vamos
para verifyToken
*/
const jwt = require("jsonwebtoken");
var verify = require('../src/controllers/verifyToken.js');
var should = require("chai").should();//Tbm tem should e expect
var assert = require("chai").assert;
