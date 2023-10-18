"use strict"
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/order:
const order = require('../controllers/order')
const permissions = require('../middlewares/permissions')

//URL:/orders

router.route('/')
    .get(permissions.isLogin, order.list)
    .post(permissions.isLogin, order.create)

router.route('/:id')
    .get(permissions.isLogin, order.read)
    .put(permissions.isLogin, order.update)
    .patch(permissions.isLogin, order.update)
    .delete(permissions.isAdmin, order.delete)



/* ------------------------------------------------------- */
module.exports = router
