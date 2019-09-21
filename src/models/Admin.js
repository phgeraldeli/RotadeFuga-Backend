const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

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
        type: { bairro: {
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
        } },
        required: true
    }
});

AdminSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: true }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
}

const Admin = mongoose.model('Admin', AdminSchema);

function validateAdmin(admin) {
    const schema = {
        user: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(8).max(20).required()
      };
    
      return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;