const express = require('express');
const usuarioController = require('./controllers/UsuarioController')
const routes = express.Router();

routes.get('/', (req,res) => {
    return res.json( { message: `Olá: ${req.query.name}`});
})

routes.post('/usuario/create', usuarioController.store);
routes.put('/usuario/update', usuarioController.update);

module.exports = routes;