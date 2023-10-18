"use strict"

//MW Permissions

module.exports = {

        isLogin: (req, res, next) => {
        //    return next() ------------------------------------------------->>>>>>>> TEST MODE ACTIVE
            if (req.isLogin) {
                next()     
            } else {
                res.errorStatusCode = 403
                throw new Error('you must LOGIN first dude! No Permission!')
            }
        },



        isAdmin: (req, res, next) => {
        //return next() ------------------------------------------------->>>>>>>> TEST MODE ACTIVE
            if (req.isLogin && req.user.isAdmin) {
                next()          
            } else {
                res.errorStatusCode = 403
                throw new Error("you're not an Admin dude! No Permission!")
            }
        }
}