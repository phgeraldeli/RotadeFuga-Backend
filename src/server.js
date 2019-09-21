const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('config');


const server = express();

if(!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined");
    process.exit(1);
}


mongoose.connect('mongodb+srv://admin:admin@cluster0-jbxjg.mongodb.net/RotadeFugaDatabase', 
{
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to MongoDB...");
}).catch(err => {
    console.error("Could not connect to MongoDB");
});

server.use(express.json());
server.use(routes);

server.listen(3333);