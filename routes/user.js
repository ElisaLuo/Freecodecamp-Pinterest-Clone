const express = require('express');
const router = express.Router();
const Post = require("../models/post.models");
const User = require("../models/user.models");

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
    Post.findOneAndUpdate(
        {_id: req.body.post},
        {$addToSet: {'likedUsers': req.user.username}},
        {new: true},
        function (err, post) {
            if (err) throw err;
        }
    )
})
module.exports = router;