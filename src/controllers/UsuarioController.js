const Usuario = require('../models/Usuario');

module.exports = {
    async store(req, res) {

        const { nome, latitude, longitude } = req.body;

        await Usuario.create({
            nome,
            latitude,
            longitude
        })

        return res.json(req.body);        
    }
}