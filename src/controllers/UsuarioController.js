const Usuario = require('../models/Usuario');

module.exports = {
    async store(req, res) {

        const { nome, latitude, longitude } = req.body;

        await Usuario.create({
            nome,
            latitude,
            longitude
        }).then( usuario => {
            return res.send(usuario)
        }).catch( err => {
            return res.status(206).send({
                message: "Missing field validation error"
            });
        });

    },

    async update(req, res) {

        const { nome, latitude, longitude } = req.body;

        if(!nome || !latitude || !longitude) {
            return res.status(400).send({
                message: "Content cannot be empty"
            });
        }

        await Usuario.findByIdAndUpdate(req.params.userId, {
            nome,
            latitude,
            longitude
        }, {new: true}).then(usuario => {
            if(!usuario) {
                return res.status(404).send({
                    message: "Usuario not found with id " + req.params.userId
                });
            }
            res.send(usuario);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Usuario not found with id " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving usuario with id " + req.params.userId
            });
        });
    },

    async delete (req,res) {
        Usuario.findByIdAndRemove(req.params.userId).then(usuario => {
            if(!usuario) {
                return res.status(404).send({
                    message: "Usuario not found with id" + req.params.userId
                });
            }
            res.send({
                message: "Usuario deleted successfully"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Usuario not found with id " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Could not delete usuario with id " + req.params.userId
            });
        });
    },

    async findOne (req,res) {
        
        
        await Usuario.findById(req.params.userId).then(usuario => {
            if(!usuario){
                return res.status(404).send({
                    message: "Usuario not found with id" + req.params.userId
                });
            }
            res.send(usuario);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Usuario not found with id " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving usuario with id " + req.params.userId
            });
        });
    },

    async findAll (req,res) {
        await Usuario.find().then(usuarios => {
            res.send(usuarios);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        })
    }
}