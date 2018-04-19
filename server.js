const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const cors = require('cors');

const mongosse = require('mongoose');
const db = require('./config/database.js');
const User = require('./models/user');
const userRouter = require('./route/user.route');



const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

//connect to mongoDB

mongoose.connect(db.uri, db.options, () => {
        console.log('Mongodbconnected.');
    },
    err => {
        console.error('Mongodberror.:' + err)
    })

//Logging
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
})

app.use(morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
}));

//Security:
app.use(helmet());

//enable CORS
app.use(cors());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Cookie handling
app.use(cookieParser());

//Session handling
app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: true,
    saveUninitialized: true
}));

//Passport Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//User router
app.use('/', userRouter);

//Start server
app.listen(port);
console.log('The magic happens on port' + port);