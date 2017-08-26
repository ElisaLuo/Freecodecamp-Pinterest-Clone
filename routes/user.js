const express = require('express');
const router = express.Router();
const Post = require("../models/post.models");
const User = require("../models/user.models");
var likedUser = [];

router.get('/', function(req, res){
    User.find({}, function(err, user){
        if(err){
            console.log(err);
        }
        if(req.isAuthenticated() == false){
            res.render('user',{
                authenticated: req.isAuthenticated(),
                users: user
            });
        }else{
            res.render('user',{
                authenticated: req.isAuthenticated(),
                users: user,
                user: req.user.username
            });
        }
        
    })
});
router.get('/:userId', function(req, res){
    Post.find({userId: req.params.userId}, function(err, post){
        if(err){
            console.log(err);
        }
        User.find({_id: req.params.userId}, function(err, user){
            if(err){
                console.log(err);
            }
            if(req.isAuthenticated() == false){
                res.render('userPosts',{
                    authenticated: req.isAuthenticated(),
                    users: user,
                    posts: post
                });
            }else{
                res.render('userPosts',{
                    authenticated: req.isAuthenticated(),
                    users: user,
                    posts: post,
                    user: req.user.username
                });
            }
            
        })
    })
});
router.post('/', function(req, res){
    Post.find({_id: req.body.post}, function(err, posts){
        if(err){
            console.log(err);
        }
        likedUser = [];
        likedUser=posts[0].likedUsers;
        if(likedUser.indexOf(req.user.username) === -1){ //Should be inside the Post.find method
            Post.findOneAndUpdate(
                {_id: req.body.post},
                {$addToSet: {likedUsers: req.user.username}, $set:{liked: true}},
                {new: true},
                function (err, post) {
                    if(err){
                        console.log(err);
                    }
                }
            )
            User.findOneAndUpdate({username: req.user.username}, 
                {$addToSet: {likedPosts: req.body.post}},
                {new: true},
                function(err, user){
                    if(err){
                        console.log(err)
                    }
                    
                }
            )
        }
        else{
            Post.findOneAndUpdate(
                {_id: req.body.post},
                {$pull: {likedUsers: req.user.username}, $set:{liked: false}},
                {new: true},
                function (err, post) {
                    if(err){
                        console.log(err);
                    }
                }
            )
            User.findOneAndUpdate({username: req.user.username}, 
                {$pull: {likedPosts: req.body.post}},
                {new: true},
                function(err, user){
                    if(err){
                        console.log(err)
                    }
                }
            )
        }
    });
    res.redirect('back');
})
module.exports = router;