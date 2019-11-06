/*
Testes de unidade visando a corretude dos metodos encontrados em controler.
Como os metodos em UsuarioController sao todos assincronos, a gente vai deixar
eles para depois, e como Validation so lida com estruturas de dados, vamos
para verifyToken
*/

process.env.NODE_ENV = 'test'; //Set env variable to test

const chai = requier('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server.js');
const mongoose = requiere('mongoose');
const Usuario = require('../models/Usuario.js');

describe()
