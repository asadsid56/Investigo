const dotenv = require('dotenv');
const express = require("express");
const path = require("path");
const app = express();
const hbs = require('hbs');
const Register = require("./models/userRegisters");
const message = require("./models/message");
const nodemailer = require("nodemailer"); 
const fs = require('fs');
const http = require('http');
const https = require('https');

dotenv.config({ path: "./config.env"});
require("./db/conn");
const PORT = process.env.PORT;

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/investigo.live/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/investigo.live/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/investigo.live/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


// Home Page

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// use json format
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
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

app.get("/emploi", (req,res) => {
    res.render("emploi");
})

app.get("/condition", (req,res) => {
    res.render("condition");
})

app.get("*", (req,res) => {
    res.render("404");
})



// User Registration 

app.post("/register", async (req,res) => {

    
    const create_UUID = () => {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid; 
    }
    
    let uuid = create_UUID();


   try {
       const password = req.body.password;
       const confirmPassword = req.body.confirmPassword;

        if( password === confirmPassword) {
            
            const registration = new Register({ 
                userID : uuid,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phoneNumber : req.body.phoneNumber,
                gender : req.body.gender,
                age : req.body.age,
                Address : req.body.Address,
                City : req.body.City,
                CodePostal : req.body.CodePostal,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword,
            });

        const registeredSave = await registration.save();
        res.status(201).render("index");

        const emiilOutput = `
   <div class="container">
   <h2 class="emailHeading">Félicitation ${req.body.firstName} !</h2>
  
       <h4 class="mb-3">Veuillez trouver ci-joint vos coordonnées ainsi que votre numéro de client :</h4>
       <ul>
           <li><b>N° de client : ${uuid}</b></li>
           <li><b>N° de registre national : ${req.body.nationalNumber}</b></li>
           <li>Prénom : ${req.body.firstName} </li>
           <li>Nom : ${req.body.lastName} </li>
           <li>N° de téléphone : ${req.body.phoneNumber} </li>
           <li>Sexe : ${req.body.gender} </li>
           <li>Age : ${req.body.age} </li>
           <li>Adresse : ${req.body.Address} </li>
           <li>Ville : ${req.body.City} </li>
           <li>Code Postal : ${req.body.CodePostal} </li>
       </ul>

       <p>Veuillez consulter notre site Internet afin de prendre rendez-vous. Vous pouvez aussi
       réserver grâce à <a href="https://outlook.office365.com/owa/calendar/RendezVousClient@NETORGFT10103042.onmicrosoft.com/bookings/" target="_blank" class="mt-3 btn-purple">ce lien</a>.</p>
       
       <p>Au cours de votre rendez-vous avec l&#39;un de nos agents, vous pourriez en apprendre
       davantage sur InvestiGo et finaliser votre contrat d'investissement.</p>

       <p>Merci d'avoir en main votre numéro de client pour conclure votre contrat.</p>

       <p>Nous vous prions d'agréer, Madame/Monsieur, nos salutations les plus sincères.</p>

       <p>Bien à vous,</p>

       <h3>INVESTIGO</h3>
       <span>(+32) 0492 07 68 30 <br>
       Rue aux laines 68-72 <br>
       Bruxelles, 1000</span>
</div>`;
        let USER_M = process.env.USER_M;
        let USER_P = process.env.USER_P;
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: USER_M, // generated ethereal user
                pass: USER_P     // generated ethereal password
            }, 
            tls: {
                rejectUnauthorized: false
            }
        });
        
         // send mail with defined transport object
         let info = await transporter.sendMail({ 
            from: 'info@investigo.live', // sender address
            to: `${req.body.email} , info@investigo.live`, // list of receivers
            subject: "Confirmation de votre inscription ✔", // Subject line
            //: "Hello world?", // plain text body
            html: emiilOutput // html body
          });
        
        //   console.log("Message sent: %s", info.messageId);
        //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
         console.log("Email has been sent");

        } else {
            res.send("Invalid credientials")
        }

   } catch (error) {
       res.status(400).send(error);
   }


   

});


// User Messages or Questions

app.post("/index", async (req,res) => {


    try {
        const messages = new message({

            fullName : req.body.fullName,
            email : req.body.email,
            message : req.body.message
            
        });

    const messageSave = await messages.save();
    res.status(201).render("index");

    } catch (error) {
        res.status(400).send(error);
    }

});

   



// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);

    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    // res.redirect('https://example.com' + req.url);
})

httpsServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at ${PORT}`);
});

httpServer.listen(80, '0.0.0.0', () => {
	console.log('HTTP Server running on port 80');
});
