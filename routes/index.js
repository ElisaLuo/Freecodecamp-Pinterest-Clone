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
                posts: posts,
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
router.post('/', function(req, res){
    console.log(req.body);
    Post.find({_id: req.body.post}, function(err, posts){
        if(err){
            console.log(err);
        }
        console.log(posts[0].likedUsers);
        likedUser=posts[0].likedUsers;
    });
    if(likedUser.indexOf(req.user.username) !== -1){
        Post.findOneAndUpdate(
            {_id: req.body.post},
            {$pull: {likedUsers: req.user.username}},
            {new: true},
            function (err, post) {
                if(err){
                    console.log(err);
                }
                console.log("sss");
            }
        )
    }
    else if(likedUser.indexOf(req.user.username) == -1){
        Post.findOneAndUpdate(
            {_id: req.body.post},
            {$addToSet: {likedUsers: req.user.username}},
            {new: true},
            function (err, post) {
                if(err){
                    console.log(err);
                }
                console.log("aaa");
            }
        )
    }
})
module.exports = router;