const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const User = require('../models/user.models');

//twitter consumer key	QgYFdIqwi5vXTRBm4GRgqtHTm
//twitter consumer secret BvgtMs69d0Wg8bfvV0OvCzMQf8ef4gn3PoR3NwYbEhhyJmYoc9


router.get('/github', passport.authenticate('github'));

passport.use(new GitHubStrategy({
    clientID: "1dcd32c8d35ca9cf669d",
    clientSecret: "e854f6f5a189f5a622ae9dda14e0661da777b592",
    callbackURL: "https://pinterest-clone-elisal.c9users.io/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
        //create user
        User.findOne({ username: profile.username }, (err, user) => {
            if (err) return done(err);
            if (!user) {
                var newUser = new User({
                    username: profile.username,
                }).save((err, user) => {
                    if (err) throw err;
                    done(null, user);
                });
            } else {
                done(null, user);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.get('/github/callback', passport.authenticate('github', {failiureRedirect: '/'}), function(req, res){
    res.redirect('/');
    console.log('logged in');
});
module.exports = router;