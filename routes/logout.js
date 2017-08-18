const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    req.logout();
    console.log("logged out");
    res.redirect('/');
});

module.exports = router;