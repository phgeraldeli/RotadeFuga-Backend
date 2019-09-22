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
        minlength: 5,
        maxlength: 400
    }
});

module.exports = mongoose.model('Admin', AdminSchema);