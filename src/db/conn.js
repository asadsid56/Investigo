
const mongoose = require("mongoose"); 



const DB = process.env.DATABASE;

// Connecting a database 
mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("conecction successfull");
}).catch(() => {
    console.log("connection unsuccessful");
})

