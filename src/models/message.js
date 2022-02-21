const mongoose = require("mongoose");
const validator = require("validator");


const userMessage = new mongoose.Schema({ 
    
    fullName : {
        type:String,
        required:true,
        minlength:3
    },

    email : {
        type:String,
        required:true
        // validate(value) {
        //     // if email invalid throw error
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Email is invalid");
        //     }
        // }
    },

   message : {
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

const Contact = new mongoose.model('Message', userMessage);

module.exports = Contact;  