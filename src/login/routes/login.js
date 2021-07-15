
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
        if(!user){
            console.log("not authenticate")
            return res.status(404).redirect('/login')
        }
        // console.log(user)
        req.logIn(user,(err)=>{
            if(err) return next(err);
            if(user){
                console.log("authenticate")
                return  res.status(200).redirect('/login/home')
            }
        }) 

    })(req,res,next);
})


router.get('/home',auth,async(req,res)=>{
    console.log("Okkk")
    let userData = req.session.passport.user;
    // console.log(req.session.passport.user)
    res.status(200).render('home',{ userData : userData })
})


router.get('/test',async(req,res)=>{
    res.status(200).render('test')
})




router.get('/logout',async(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        req.logout()
        res.clearCookie('connect.sid')
        res.redirect('/login')
    })

})












module.exports = router;