const { Schema, model } = require('mongoose');

const RotaSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true
  },
  rota_id: {
    type: Number,
    required: true
  }
});

module.exports = model('Rota', RotaSchema);
