const Rota = require('../models/Rota');

module.exports = {
  async store(req, res) {

      const { latitude, longitude, rota_id } = req.body;

      await Rota.create({
          latitude,
          longitude,
          rota_id
      })

      return res.json(req.body);
  },

  async update(req, res) {

      const { latitude, longitude, rota_id } = req.body;

      if(!latitude || !longitude || !rota_id) {
          return res.status(400).send({
              message: "Content cannot be empty"
          });
      }

      await Rota.findByIdAndUpdate(req.params.rotaId, {
          latitude,
          longitude,
          rota_id
      }, {new: true}).then(rota => {
          if(!rota) {
              return res.status(404).send({
                  message: "Rota not found with id " + req.params.rotaId
              });
          }
          res.send(rota);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Rota not found with id " + req.params.rotaId
              });                
          }
          return res.status(500).send({
              message: "Error retrieving rota with id " + req.params.rotaId
          });
      });
  },

  async delete (req,res) {
      Rota.findByIdAndRemove(req.params.rotaId).then(rota => {
          if(!rota) {
              return res.status(404).send({
                  message: "Rota not found with id" + req.params.rotaId
              });
          }
          res.send({
              message: "Rota deleted successfully"
          });
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Rota not found with id " + req.params.rotaId
              });                
          }
          return res.status(500).send({
              message: "Could not delete rota with id " + req.params.rotaId
          });
      });
  },

  async findOne(req, res) {


    await Rota.find({ rota_id: req.params.rotaId }).then(rota => {
      if (!rota) {
        return res.status(404).send({
          message: "Rota not found with id" + req.params.rotaId
        });
      }
      res.send(rota);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Rota not found with id " + req.params.rotaId
        });
      }
      return res.status(500).send({
        message: "Error retrieving rota with id " + req.params.rotaId
      });
    });
  },

  async findAll (req,res) {
      await Rota.find().then(rotas => {
          res.send(rotas);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          })
      })
  }
}