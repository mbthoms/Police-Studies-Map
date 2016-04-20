/**
 * Created by matthewthoms on 2016-03-17.
 */
var express = require('express');
var router = express.Router();

//Making sure the modules are included into the page.
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, user) {
        done(err, user);
    });
});

//GET Login Form - Rending the page/Routing the page.
router.get('/', function(req, res, next) {
    //Storing the messages into the current session with a variable.
    var messages = req.session.messages || [];

    //Deleting the session message when the page is reloaded.
    req.session.messages = [];

    //Showing the Login Page. Push the messages if any to the page.
    res.render('login/login', {
        title: 'Login - Police Studies Map',
        user: req.user,
        messages: messages
    });
});

//Validating the User.
router.post('/', passport.authenticate('local', {
    successRedirect: '/landing',
    failureRedirect: '/login/login',
    failureMessage: 'Invalid Login, Please try again.'
}));



//Routing the Register Page.
router.get('/register', function(req, res, next) {
    res.render('/login/register', {
        title: 'Register - Police Studies Map'
    });
});

//Saving the User, Using the register page.
router.post('/register', function(req, res, next) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            //Redirect the User to the login when data is saved into database.
            return res.render('/login/register', { title: 'Register - Police Studies Map' });
        }
        else {
            //Redirect the user to the login page.
            res.redirect('/login/login');
        }
    });
});

//GET Logout - Destroying the session.
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
})

//Making the page public.
module.exports = router, passport;