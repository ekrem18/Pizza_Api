"use strict"
/*
    $ mkdir logs
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i jsonwebtoken morgan
*/


const express = require('express')
const app = express()


/* ------------------------------------------------------- */
//Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')


/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const {dbConnection} = require('./src/configs/dbConnection')
