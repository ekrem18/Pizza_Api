"use strict"
// MongoDB Connection:

const mongoose = require('mongoose')

const dbConnection = function(){
    mongoose.connect(process.env.MONGODB)
        .then(()=> console.log('*DB CONNECTED*'))
        .catch((err)=> console.log('*DB NOT CONNECTED*', err))
}
/* ------------------------------------------------------- */
module.exports={
    mongoose,
    dbConnection
}