const Admin = require('../models/Admin');
const auth = require("../controllers/AuthenticationController");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();


module.exports = {
    async store(req, res) {
        const { error } = Admin.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } 

        let admin = await Admin.findOne({
             user: req.body.user, 
        });
        if (admin){
            req.status(400).send("Usuario já registrado, tente outro nome");
        }

        admin = new Admin({
            user: req.body.user,
            password: req.body.password,
            localidade: req.body.localidade
        })

        admin.password = await bcrypt.hash(admin.password, 10);
        await admin.save();

        const token = admin.generateAuthToken();
            res.header("x-auth-token", token).send({
                _id: admin._id,
                user: admin.user,
                localidade: admin.localidade
            });
    }
}


module.exports = router;
