const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');
const server = express();
const authRoute = require('../src/auth');
const dotenv = require('dotenv');

dotenv.config();

//Connect to db
mongoose.connect(
    process.env.DB_CONNECT_TEST,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        keepAlive: true,
        useCreateIndex: true,
    }).then(() => {
        console.log("Connected to MongoDB...");
    }).catch(err => {
        console.error("Could not connect to MongoDB");
    }
    );

server.use(express.json());
server.use(routes);

//Routes Middlewares
server.use('/api/user', authRoute);

server.listen(3333, () => console.log('Server up and running'));
module.exports = server; //for testing
