"use strict"

/*----------------------------------------*/
//Auth Controller

const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports={
    login: async(req, res)=>{
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */
       const {username, password} = req.body                   //------> req.body'den username ve password gelecek onları alıyorum      
       if(username && password) {                              //------> bana bu gelen password ve username'li olan user ara 
            const user = User.findOne({username, password})    //------> şifre normal girilse de user modeli password'de bulunan set metodu şifreleyerek gönderiyor   

       }else {
            res.errorStatusCode = 401
            throw new Error('Please enter username AND password')
       }

    },

    refresh: async(req, res)=>{
         /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Token Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    token: {
                        refresh: '...refreshToken...'
                    }
                }
            }
        */

    },

    logout: async(req, res)=>{
           /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

    },

}