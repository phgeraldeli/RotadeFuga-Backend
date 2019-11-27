const Usuario = require("../models/Usuario");

module.exports = {
  async store(req, res) {
    const { nome, latitude, longitude } = req.body;

    await Usuario.create({
      nome,
      latitude,
      longitude
    })
      .then(usuario => {
        return res.send(usuario);
      })
      .catch(err => {
        return res.status(206).send({
          message: "Missing field validation error"
        });
      });
  },

  async update(req, res) {
    const { nome, latitude, longitude } = req.body;

    if (!nome || !latitude || !longitude) {
      return res.status(400).send({
        message: "Content cannot be empty"
      });
    }

    await Usuario.findByIdAndUpdate(
      req.params.userId,
      {
        nome,
        latitude,
        longitude
      },
      { new: true }
    )
      .then(usuario => {
        res.send(usuario);
      })
      .catch(err => {
        return res.status(404).send({
          message: "Usuario not found with id " + req.params.userId
        });
      });
  },

  async delete(req, res) {
    Usuario.findByIdAndRemove(req.params.userId)
      .then(usuario => {
        res.send({
          message: "Usuario deleted successfully"
        });
      })
      .catch(err => {
        return res.status(404).send({
          message: "Usuario not found with id " + req.params.userId
        });
      });
  },

  async findOne(req, res) {
    await Usuario.findById(req.params.userId)
      .then(usuario => {
        res.send(usuario);
      })
      .catch(err => {
        return res.status(404).send({
          message: "Usuario not found with id " + req.params.userId
        });
      });
  },

  async findAll(req, res) {
    await Usuario.find().then(usuarios => {
      res.send(usuarios);
    });
  }
};
