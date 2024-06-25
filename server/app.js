const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {prisma} = require("./prisma/prismaClient");
const cors = require('cors');

require("dotenv").config();

const app = express();

let corsOptions = {
    origin : ['http://localhost:5173'],
}

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require('./routes/users'));

module.exports = app;
