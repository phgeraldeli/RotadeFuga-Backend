const mongoose = require('mongoose');

const LocalidadeSchema = new mongoose.Schema({
    bairro: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2,
    }
});

module.exports = mongoose.model('Localidade', LocalidadeSchema);