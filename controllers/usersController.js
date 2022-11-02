const { findByIdAndUpdate } = require('../models/userModel');
const User = require('../models/userModel');
const session = require("express-session");
const filestore = require("session-file-store")(session);

let msg = '';

module.exports = {

    signinGet: (req, res) => {
        if(req.session.consumer){
            res.render('users/home');
        }else{
            console.log("This is user's signin page");
            res.render('users/userSignin',{message:msg});
            msg = '';
        }
    },

    signupGet: (req, res) => {
        console.log('This is signup page');
        res.render('users/userSignup');
    },

    signinPost: async (req, res, next) => {
        const { Email, Password } = req.body;
        console.log(Email, Password);
        const consumer = await User.findOne({ Email, Password });

        try {
            console.log('Inside try block of user signin');
            if (Email == consumer.Email && Password == consumer.Password) {
                console.log('Checking username and password are equal or not');
                console.log(req.session);
                req.session.consumer = Email;

                res.cookie('userId', Email, {
                    maxAge: 2 * 60 * 60 * 1000,
                    httpOnly: true
                });

                res.redirect('/');
            }
        } catch (error) {
            msg = 'Invalid username or password';
            console.log('Invalid username or password error');
            res.redirect('/');
        }
    },

    signupPost: async (req, res) => {
        console.log(req.body);
        try {
            console.log('Inside try block of signup');

            const user = new User({
                Name: req.body.userName,
                Email: req.body.Email,
                Password: req.body.Password
            });

            const userData = await user.save();
            res.redirect("/");

        } catch(error) {
            console.log(error.message);
            res.status(500).send(error);
        }

    },

    userLogout: (req,res) => {
        try {
            res.clearCookie('userId');
            res.clearCookie('session-1');
            res.redirect('/');
        } catch(error){
            console.log(error.message);
        }
    }
}