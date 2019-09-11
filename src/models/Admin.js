const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const Localidade = require('./Localidade');

const AdminSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
    },
    localidade: {
        type: Localidade,
        required: true
    }
});

AdminSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: true }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
}

const Admin = mongoose.model('Admin', AdminSchema);

validateAdmin(admin) = () => {
    const schema = {
        user: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(8).max(20).required()
      };
    
      return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;