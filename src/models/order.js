"use strict"

const {mongoose} = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Order Model:

const OrderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    
    pizzaId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pizza',
        required: true,
    },
    
    size : {
        type: String,
        trim: true,
        required: true,
        enum:['Small', 'Medium', 'Large', 'XLarge']
    },
   
    quantity : {
        type: Number,
        default: 1,
        // required: true,
    },

    price : {
        type: Number,
        default: 0,
        // required: true,
    },
    
    totalPrice : {
        type: Number,
    },

}, {
    collection: 'orders',
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)



// {
//     "userId": "652e8ae6b2a8c574b4fcc069",
//     "pizzaId": "652fa91b30970082bc400532",
//     "size":"XLarge",
//     "price": 99.99,
//     "quantity": 2
//   }