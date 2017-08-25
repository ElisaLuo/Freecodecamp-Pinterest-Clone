const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');
const likedUser = [];

router.get('/', function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        }
        if(req.isAuthenticated() == false){
            res.render('index',{
                authenticated: req.isAuthenticated(),
                posts: posts
            });
        }else{
            res.render('index',{
                authenticated: req.isAuthenticated(),
                posts: posts,
                user: req.user.username
            });
        }
        
    })
});

module.exports = router;