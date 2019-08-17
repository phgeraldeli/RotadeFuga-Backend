const express = require('express');
const usuarioController = require('./controllers/UsuarioController')
const routes = express.Router();

routes.get('/', (req,res) => {
    return res.json( { message: `Olá: ${req.query.name}`});
})

routes.post('/usuario', usuarioController.store);
routes.get('/usuario', usuarioController.findAll);
routes.put('/usuario/:userId', usuarioController.update);
routes.get('/usuario/:userId', usuarioController.findOne);
routes.delete('/usuario/:userId', usuarioController.delete);

module.exports = routes;