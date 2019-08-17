const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);