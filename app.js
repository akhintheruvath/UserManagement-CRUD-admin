const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const filestore = require("session-file-store")(session);
const hbs = require('hbs');
const PORT = 3000;

const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views','./views');
app.set('view engine','hbs');

app.use(
    session({
        name: "session-1",
        secret: "Secret",
        saveUninitialized: false,
        resave: false,
        store: new filestore(),
    })
);

app.use(cookieParser());

app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

app.use('/',userRouter);
app.use('/admin',adminRouter);

mongoose.connect('mongodb://127.0.0.1:27017/users?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4').then(() => {
    app.listen(PORT, () => console.log('Server started'))
}).catch((err) => {
    console.log('Error occured');
    console.log(err);
});