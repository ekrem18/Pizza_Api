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
       const {username, password} = req.body                        //------> req.body'den username ve password gelecek onları alıyorum 
       if (username && password) {                                  //------> bana bu gelen password ve username'li olan user ara
                                                                     
        const user = await User.findOne({ username, password })     //------> şifre normal girilse de user modeli password'de bulunan set metodu şifreleyerek gönderiyor

        if (user) {

            if (user.isActive) {

                res.send({
                    error: false,
                    token: {
                        access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '10m' }),
                        refresh: jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' }),
                    }
                })

            } else {

                res.errorStatusCode = 401
                throw new Error('This account is not active.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Wrong username or password.')
        }
    } else {

        res.errorStatusCode = 401
        throw new Error('Please enter username and password.')
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
       const refreshToken = req.body?.token?.refresh
       if(refreshToken){
                //---> jwt doğrulama yapcak.Gelen refresh token'ı ref.KEY ile aç hata varsa err yoksa userData'ya tanımla
            jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData){ 

                if (err) {

                    res.errorStatusCode = 401
                    throw err
                } else {

                    const { _id, password } = userData

                    if (_id && password) {

                        const user = await User.findOne({ _id })

                        if (user && user.password == password) {

                            if (user.isActive) {

                                // const data = {
                                //     access: user.toJSON(),
                                //     refresh: { _id: user._id, password: user.password },
                                //     shortExpiresIn: '10m',
                                //     longExpiresIn: '3d'
                                // }

                                // res.send({
                                //     error: false,
                                //     token: {
                                //         access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
                                //         refresh: null
                                //     }
                                // })

                                res.send({
                                    error: false,
                                    token: setToken(user, true)
                                })

                            } else {

                                res.errorStatusCode = 401
                                throw new Error('This account is not active.')
                            }
                        } else {

                            res.errorStatusCode = 401
                            throw new Error('Wrong id or password.')
                        }
                    } else {

                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }
                }
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter token.refresh')
        }
    },

    logout: async(req, res)=>{
           /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */
            res.send({
                error: false,
                message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
            })
    },

}