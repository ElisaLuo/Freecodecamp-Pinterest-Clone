const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');

router.get('/', function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        }
        res.render('index',{
            authenticated: req.isAuthenticated(),
            posts: posts
        });
    })
});

module.exports = router;