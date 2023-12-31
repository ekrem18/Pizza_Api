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

//accessToken Control
app.use(require('./src/middlewares/authentication'))
// const jwt = require('jsonwebtoken')
// app.use((req, res, next) => {
//     const auth = req.header?.authorization //Bearer jkdh.TOken....
//     const accessToken = auth ? auth.split(' ')[1] : null 

//     req.isLogin = false                     //--> bu kod bloğunda;jwt'yi çektik. sonrasında header ile gelen access key'ini alabilmek için boşluktan aırıp 1.endeksi elime 
//     req.user = null                     //-->aldım. Değerleri her yerde geçerli olması şiçin soldaki değişkenleri tanımladım. 
                                           //-->elde ettiğim accessToken'ı decrypt ettim. eğer userDatam geldiyse giriş doğrudur mantığıyla req.'ler tanımlandı
//     jwt.verify(accessToken, process.env.ACCESS_KEY, function(err , userData){
//         if(userData){
//             req.isLogin = true      
//             req.user = userData
//         }
//     } )
//     next()
// })

// Run Logger:
app.use(require('./src/middlewares/logger'))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))




/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req,res)=>{
    res.send({
        error:false,
        message: 'Welcome to PIZZA API',
        isLogin: req.isLogin,
        user: req.user
    })
})

//auth:
app.use('/auth', require('./src/routes/auth'))
//user:
app.use('/users', require('./src/routes/user'))
//order:
app.use('/orders', require('./src/routes/order'))
//pizza:
app.use('/pizzas', require('./src/routes/pizza'))
//topping:
app.use('/toppings', require('./src/routes/topping'))



/* ------------------------------------------------------- */
//errorHandler
app.use(require('./src/middlewares/errorHandler'))



// RUN SERVER:
app.listen(PORT,()=> console.log('http://127.0.0.1:' + PORT) )



/* ------------------------------------------------------- */
// Syncronization :
// require('./src/helpers/sync')()
