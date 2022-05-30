// core import
const express = require('express');
const router = require('./src/routes/api')
const app = new express();

// security middleware import
const bodyParser = require('body-parser');
const cors =  require('cors');
const cookieParser =  require('cookie-parser');
const mongoSanitize =  require('express-mongo-sanitize');
const helmet =  require('helmet');
const hpp =  require('hpp');
const xssClean =  require('xss-clean');
const rateLimit =  require('express-rate-limit');

// ratelimite implement

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})
app.use(apiLimiter);


// middleware implement

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xssClean());
app.use(xssClean());


// mongodb import

const mongoose = require('mongoose')

// mongodb connections 

const URI = "mongodb://127.0.0.1:27017/todo"
const option = {user:'',pass:'',autoIndex:true}

mongoose.connect(URI,option,(error)=>{
    if(error){
         console.log(error);
    }
    else{
        console.log("mongodb connections successful");
    }
})

// api router 
app.use('/api/v1/',router)

app.use('*',(req,res)=>{
    res.status(404).send({status:"fail",data:"Not Found"})
})
module.exports = app ;