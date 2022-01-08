const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    firstName : {
        type:String,
        required:true
    },

    lastName : {
        type:String,
        required:true
    },

    email : {
        type:String,
        required:true,
        unique:true,
        validate(value) {
            // if email invalid throw error
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },

    phoneNumber : {
        type:Number,
        required:true,
        unique:true
    },

    gender : {
        type:String,
        required:true
    },

    age : {
        type:Number,
        required:true
    },

    password : {
        type:String,
        required:true
    },

    confirmPassword : {
        type:String,
        required:true
    },

    file : {
        type:String,
        required:true
    },

    active:Boolean, 
    date : {
        type:Date,
        default:Date.now
    },



    
})

// Create a Collection

const Register = new mongoose.model('User', userSchema);

module.exports = Register;  