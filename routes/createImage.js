const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');

router.post('/', function(req, res){
    Post.findOne({}, (err, user) => {
        if (err) return err;
            var newPost = new Post({
                username: req.user.username,
                userId: req.user._id,
                image: req.body.link,
                comment: req.body.comment
            }).save((err, post) => {
                if (err) throw err;
            });
        });
    res.redirect('/');
});

module.exports = router;