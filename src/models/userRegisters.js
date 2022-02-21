const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    userID : {
        type:String
    },

    nationalNumber : {
        type:Number
    },

    lastName : {
        type:String,
        required:true
    },
    
    firstName : {
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

    Address : {
        type:String,
        required:true
    },

    City : {
        type:String,
        required:true
    },

    CodePostal : {
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

    active:Boolean, 
    date : {
        type:Date,
        default:Date.now
    },

    
})

userSchema.pre("save", async function (next) {

    if(this.isModified("password")){
        
        console.log(`the current password ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password ${this.password}`);
        this.confirmPassword = undefined;
    }

    next();
})

// Create a Collection

const Register = new mongoose.model('User', userSchema);

module.exports = Register;  