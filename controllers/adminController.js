const session = require("express-session");
const filestore = require("session-file-store")(session);
const User = require('../models/userModel');

let userData;
let showUser;
let msg = '';

module.exports = {

    loginGet: async (req, res) => {
        console.log('This is admin page');
        if (req.session.adminSession) {
            userData = await User.find();
            res.render('admin/adminHome', { data: userData });
        } else {
            res.render('admin/adminLogin',{message:msg});
            msg = '';
        }
    },

    loginPost: async (req, res) => {
        console.log('Inside loginPost');

        const admin = { Email: 'admin@gmail.com', Password: 'admin' };

        const { Email, Password } = req.body;
        console.log(req.body);

        try {
            console.log('Inside admin try');
            if (Email == admin.Email && Password == admin.Password) {
                console.log('Admin verified');
                req.session.adminSession = Email;

                res.cookie('adminId', Email, {
                    maxAge: 2 * 60 * 60 * 1000,
                    httpOnly: true,
                });

                userData = await User.find();

                res.redirect('/admin');
            } else {
                console.log('Invalid admin username or password');
                msg = 'Invalid username or password';
                res.redirect('/admin');
            }
        } catch (error) {
            console.log('Error occured');
            res.status(500).send(error);
        }
    },

    addUserPage: (req, res) => {
        console.log('Insdie this block');
        res.render('admin/addUser');
        console.log('Inside addUserPage');
    },

    addUserPost: async (req, res) => {
        console.log('Inside addUserPost');
        let user = new User({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password
        });

        let userData = await user.save();

        userData = await User.find();
        console.log(userData);

        res.redirect('/admin');
    },

    updateUser: async (req, res) => {
        console.log('Inside updateUser');
        console.log(req.params);
        const { id } = req.params;
        const datas = await User.findById(id);
        res.render('admin/userEdit', { datas });
    },

    updateUserPost: async (req, res) => {
        console.log('Inside updateUserPost');
        const { id } = req.params;
        const updatedData = req.body;
        await User.findByIdAndUpdate(id, { $set: updatedData });
        userData = await User.find();
        res.redirect('/admin');
    },

    deleteUserPost: async (req, res) => {
        console.log('Inside deleteUserPost');
        try {
            const { id } = req.params;
            await User.findByIdAndDelete(id);
            userData = await User.find();
            res.redirect('/admin');
        } catch (error) {
            console.log(error);
        }
    },

    search: async (req, res) => {
        console.log('Inside search block');
        console.log(req.body.search);
        const searchData = req.body.search;
        showUser = await User.find({Name:searchData});
        console.log(showUser);
        res.render('admin/adminHome',{ data : showUser });
    },

    adminLogout: (req, res) => {
        console.log('Inside adminLogout');
        try {
            res.clearCookie('adminId');
            res.clearCookie('session-1');
            res.redirect('/admin');

        } catch (error) {
            console.log(error.message);
        }
    }
}