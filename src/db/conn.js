const mongoose = require("mongoose"); 

// Connecting a database 
mongoose.connect("mongodb://localhost:27017/investico", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("conecction successfull");
}).catch(() => {
    console.log("connection unsuccessful");
})

