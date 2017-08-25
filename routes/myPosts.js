const express = require('express');
const router = express.Router();
const Post = require("../models/post.models");

router.get('/', function(req, res){
    Post.find({username: req.user.username}, function(err, post){
        if(err){
            console.log(err);
        }
        if(req.isAuthenticated() == false){
            res.render('myPosts',{
                authenticated: req.isAuthenticated(),
                posts: post,
            });
        }else{
            res.render('myPosts',{
                authenticated: req.isAuthenticated(),
                posts: post,
                user: req.user.username
            });
        }
        
    })
});
router.post('/', function(req, res){
    Post.findByIdAndRemove(req.headers.post, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('back');
    })
})

module.exports = router;