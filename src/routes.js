const express = require('express');
const usuarioController = require('./controllers/UsuarioController');
const routes = express.Router();
const verify = require('./controllers/verifyToken');


routes.get('/', (req,res) => {
    return res.json( { message: `Olá: ${req.query.name}`});
});

routes.post('/usuario/create', usuarioController.store);
routes.put('/usuario/update', usuarioController.update);


//Exemplo de como usar o auth
routes.get('/authRequest', verify, (req,res) => {
    res.json({posts: {title: 'My first post', description: 'random data you shouldnt access without permission'}});
})

module.exports = routes;