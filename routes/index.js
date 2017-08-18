const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('index',{
        authenticated: req.isAuthenticated()
    });
});

module.exports = router;