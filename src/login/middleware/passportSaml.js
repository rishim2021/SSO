const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const fs = require('fs');
const path = require('path');
const cert = fs.readFileSync(path.join(__dirname, './okta.pem'), 'utf8');


// https://saml.numberone.com/saml/sso/exk18diudb1OJ67on5d7

module.exports = function(passport){
    console.log("passport working")

    passport.use(new SamlStrategy({
        path:'/login/callback',
        entryPoint:'https://dev-03171494.okta.com/app/dev-03171494_numberone_1/exk18diudb1OJ67on5d7/sso/saml',
        issuer:'http://www.okta.com/exk18diudb1OJ67on5d7',
        cert:cert,
        identifierFormat: null
    },
    async function(profile,done){
        console.log(profile)
    //    let isMatch = await findByEmail(profile.email).catch((e)=>{
    //        return done(e)
    //    })
    //    console.log(isMatch)
      return done(null,profile)
    })
    )
    passport.serializeUser((user, done) => {
        done(null, user);
      });
      
      passport.deserializeUser((user, done) => {
        done(null, user);
      });
}