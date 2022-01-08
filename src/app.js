const express = require("express");
const path = require("path");
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 5000;
require("./db/conn");
const Register = require("./models/userRegisters");

// Home Page

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// use json format
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);
// app.get( path, callback )

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/register", (req,res) => {
    res.render("register");
})

app.get("/login", (req,res) => {
    res.render("login");
})

app.post("/register", async (req,res) => {
   try {
       const password = req.body.password;
       const confirmPassword = req.body.confirmPassword;

        if( password === confirmPassword) {
            
            const registration = new Register({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phoneNumber : req.body.phoneNumber,
                gender : req.body.gender,
                age : req.body.age,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword,
                file : req.body.file
            });

        const registeredSave = await registration.save();
        res.status(201).render("index");

        } else {
            res.send("password are not matching")
        }

   } catch (error) {
       res.status(400).send(error);
   }
})

// Create Server

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
