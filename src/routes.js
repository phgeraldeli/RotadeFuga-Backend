const express = require('express');
const usuarioController = require('./controllers/UsuarioController');
const rotasController = require('./controllers/RotasController');
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

routes.post('/rotas', rotasController.store);
routes.get('/rotas', rotasController.findAll);
routes.put('/rotas/:rotaId', rotasController.update);
routes.get('/rotas/:rotaId', rotasController.findOne);
routes.delete('/rotas/:rotaId', rotasController.delete);

//Exemplo de como usar o auth
routes.get('/authRequest', verify, (req,res) => {
    res.json({posts: {title: 'My first post', description: 'random data you shouldnt access without permission'}});
})

module.exports = routes;