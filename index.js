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
dbConnection()



/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())
// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))




/* ------------------------------------------------------- */
// Routes:



/* ------------------------------------------------------- */
//errorHandler
app.use(require('./src/middlewares/errorHandler'))



// RUN SERVER:
app.listen(PORT,()=> console.log('http://127.0.0.1:' + PORT) )



/* ------------------------------------------------------- */
// Syncronization :
//require('./src/helpers/sync')()
