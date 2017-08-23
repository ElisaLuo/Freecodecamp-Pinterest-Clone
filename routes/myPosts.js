const express = require('express');
const router = express.Router();
const Post = require("../models/post.models");

router.get('/', function(req, res){
    Post.find({username: req.user.username}, function(err, post){
        if(err){
            console.log(err);
        }
        res.render('myPosts',{
            authenticated: req.isAuthenticated(),
            posts: post
        });
    })
});
router.delete('/', function(req, res){
    Post.findByIdAndRemove(req.headers.post, function(err){
        if(err){
            console.log(err);
        }
    })
    res.redirect('/myPosts');
})

module.exports = router;