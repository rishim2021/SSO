const fs = require('fs');
const path = require('path');

const cert = fs.readFileSync(path.join(__dirname, 'okta.cert'), 'utf8');


module.exports = {
    SAML: {
      passportOptions: { // check full list of available options - https://github.com/bergie/passport-saml
        cert,
        issuer:  'http://www.okta.com/exk18diudb1OJ67on5d7', // your okta issuer url (provided by okta duerning SAML setup)
        entryPoint:  'https://saml.numberone.com/saml/sso/exk18diudb1OJ67on5d7', // entryPoint url (provided by okta duerning SAML setup)
        callbackUrl:  'http://localhost:3000/login', // your callback url 
      },
      propertiesToExtract: ['Email', 'FirstName', 'LastName'], // these properties will be saved on user session by passport access it by req.user
    },
  
    passport: {
      options: { //options to be passed to passport.authenticate(). check full list of available options - https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js
        successRedirect:  '/',
        failureRedirect:  '/login',
        failureFlash:  true,
      },
    },
  
    appRoutes: { // express-okta-saml will create GET/POST routes on these endpoints to handle auth proccess
      loginPath:  '/login', // make sure this is same as path on SAML.passportOptions.callbackUrl and passport.options.failureRedirect
      logoutPath:  '/logout',
      accessDeniedPath:  '/access-denied',
    },
  }