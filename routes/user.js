const express = require('express');
const router = express.Router();
const User = require("../models/user.models");

router.get('/', function(req, res){
    User.find({}, function(err, user){
        if(err){
            console.log(err);
        }
        res.render('user',{
            authenticated: req.isAuthenticated(),
            users: user
        });
    })
});

module.exports = router;