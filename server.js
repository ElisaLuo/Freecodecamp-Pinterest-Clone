const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require('passport');
const session = require("express-session");
const bodyParser = require('body-parser');
const index = require('./routes/index');
const auth = require('./routes/auth');
const createImage = require('./routes/createImage');
const logout = require('./routes/logout');
const user = require('./routes/user');
const myPosts = require('./routes/myPosts');

process.env.NODE_ENV = 'production';

mongoose.connect('mongodb://elisal:Pdnlxx021@ds149433.mlab.com:49433/pinterest-clone');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection to the database successful');
});

app.use(express.static('public'));
app.use(session({
    secret: 'aweio9s8d732hoisd0f932ois809',
    resave: true,
    saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(passport.initialize());//Sets up for passport
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || process.env.IP );
app.set('view engine', 'ejs');


//Sets up links for different sites
app.use('/', index);
app.use('/auth', auth);
//app.use('/createNew', createImage);
//app.use('/users', user);
app.use('/logout', logout);
//app.use('/myPosts', myPosts);

//Starts port
var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


