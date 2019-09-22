const express = require('express');
const usuarioController = require('./controllers/UsuarioController');
const routes = express.Router();
const verify = require('./controllers/verifyToken');


routes.get('/', (req,res) => {
    return res.json( { message: `Olá: ${req.query.name}`});
});

routes.post('/usuario', usuarioController.store);
routes.get('/usuario', usuarioController.findAll);
routes.put('/usuario/:userId', usuarioController.update);
routes.get('/usuario/:userId', usuarioController.findOne);
routes.delete('/usuario/:userId', usuarioController.delete);


//Exemplo de como usar o auth
routes.get('/authRequest', verify, (req,res) => {
    res.json({posts: {title: 'My first post', description: 'random data you shouldnt access without permission'}});
})

module.exports = routes;