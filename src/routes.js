const express = require('express');
const usuarioController = require('./controllers/UsuarioController');
const bcrypt = require("bcrypt");
const { Admin, validate } = require('./models/Admin');
const auth = require("./controllers/AuthenticationController");
const routes = express.Router();

routes.get('/', (req,res) => {
    return res.json( { message: `Olá: ${req.query.name}`});
});

routes.post('/usuario/create', usuarioController.store);
routes.put('/usuario/update', usuarioController.update);

routes.post('/admin/create', async (req, res) => {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        } 

        let admin = await Admin.findOne({
             user: req.body.user, 
        });

        if (admin){
            req.status(400).send("Usuario já registrado, tente outro nome");
        }

        admin = new Admin({
            user: req.body.user,
            password: req.body.password,
            localidade: req.body.localidade
        })

        admin.password = await bcrypt.hash(admin.password, 10);
        await admin.save();

        const token = admin.generateAuthToken();
        res.header("x-auth-token", token).send({
            _id: admin._id,
            user: admin.user,
            localidade: { bairo: admin.localidade.bairro, cidade: admin.localidade.cidade, estado: admin.localidade.estado }
        });
})

routes.get("/current", auth, async (req, res) => {
    const admin = await Admin.findById(req.user._id).select("-password");
    res.send(user);
  });

module.exports = routes;