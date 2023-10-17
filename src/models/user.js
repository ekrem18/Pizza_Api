"use strict"

const {mongoose} = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// User Model:
const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password : {
        type: String,  //--> aşağıdaki set metodu ile helper içerisinde olan ve string gönderen fonksiyon ile şifreleme yapmadan kaydetme yapmıyor
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)

    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'Email must be unique'],
        validate: [
            (email) => email.includes('@') && email.includes('.') ,
            'Email must include  "."  and  "@" '
        ]
    },

}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)



