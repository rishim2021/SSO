const loginService = require("../src/login/routes/login");

const express = require('express');

const path = require('path');

const db = require('../config/db');

const passport = require('passport');

const session = require('express-session');

const registerService = require('../src/register/routes/register');

const cookieParser = require("cookie-parser")

module.exports = (app) =>{

    db.sequelize.sync()
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cookieParser())
    app.use(express.static('assets'));
    app.use(session({
        secret:"Secret@123",
        cookie: { 
            secure: false
        },
        saveUninitialized: true,
        resave: true,
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    require('../src/login/middleware/passportSaml')(passport);
    app.set('view engine', 'ejs');
    app.use('/login',loginService)
    app.use('/register',registerService)
    app.get('/',async(req,res)=>{
        res.status(200).send('Welcome home !');
    })
  
}