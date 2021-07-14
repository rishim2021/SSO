
const express = require('express');

const router  = express.Router();

const db = require('../../../config/db');

const userModel = db.users;

const { validate } = require('../middleware/validation');
 
const auth = require('../middleware/authGuard');

const user = require('../../../common/models/user');

const jwt = require("jsonwebtoken");

const passport = require('passport');

const Saml2js = require('saml2js');


router.get('/',async(req,res)=>{
    // passport.authenticate('saml', {
    //     successRedirect: '/',
    //     failureRedirect: '/login',
    //   })
    res.status(200).render('login',{ layout:false,name:'Akashdeep',login:1,register:0 });
})

router.post('/callback',async(req,res,next)=>{
    console.log("running")
    passport.authenticate('saml',(err,user,info)=>{
        if(err) return next(err);
        if(!user) return res.status(400).redirect('/login')
        return res.status(200).redirect('/login/home');
    })(req,res,next);
})


router.get('/home',auth,async(req,res)=>{
    
    res.status(200).render('home')
})


router.get('/logout',async(req,res)=>{
    res.clearCookie('connect.sid')
    res.clearCookie('token')
    res.status(200).redirect('/login')

})












module.exports = router;