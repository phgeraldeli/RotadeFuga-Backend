const { Schema, model } = require('mongoose');

const Ponto = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true
  }
});

const RotaSchema = new Schema({
  pontos: [Ponto]
});

module.exports = model('Rota', RotaSchema);
