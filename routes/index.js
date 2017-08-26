const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');
const User = require('../models/user.models');
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
            User.find({username: req.user.username}, function(err, user){
                if(err){
                    console.log(err)
                }
                //console.log()
                res.render('index',{
                    authenticated: req.isAuthenticated(),
                    posts: posts,
                    user: req.user.username,
                    likedPosts: user[0].likedPosts
                });
            })
            
        }
        
    })
});

module.exports = router;