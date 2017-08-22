const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');

router.get('/', function(req, res){
    res.redirect('/')
});

module.exports = router;