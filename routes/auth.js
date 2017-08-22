const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const User = require('../models/user.models');
const TwitterStrategy = require('passport-twitter');
const GoogleStrategy = require('passport-google-auth').Strategy;

//google id 173588911532-2ed3av3agk4hqfhndvdeejva9t383pe6.apps.googleusercontent.com

//google secret 1I1Qlk_iEnaajvB8yM8uO6rc

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

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
                    source: "Github"
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
passport.use(new TwitterStrategy({
  consumerKey: "QgYFdIqwi5vXTRBm4GRgqtHTm",
  consumerSecret: "BvgtMs69d0Wg8bfvV0OvCzMQf8ef4gn3PoR3NwYbEhhyJmYoc9",
  callbackURL: "https://pinterest-clone-elisal.c9users.io/auth/twitter/callback"
},function(token, tokenSecret, profile, cb) {
    User.findOne({ username: profile.id }, (err, user) => {
        if (err) return cb(err);
            if (!user) {
                var newUser = new User({
                    username: profile.username,
                    source: "Twitter"
                }).save((err, user) => {
                    if (err) throw err;
                    cb(null, user);
                });
            } else {
                cb(null, user);
            }
        });
    }
));
passport.use(new GoogleStrategy({
  clientId: "173588911532-2ed3av3agk4hqfhndvdeejva9t383pe6.apps.googleusercontent.com",
  clientSecret: "jYYgqum1O1szP30MriZHSSSz",
  callbackURL: "https://pinterest-clone-elisal.c9users.io/auth/google/callback"
},function(token, tokenSecret, profile, cb) {
    User.findOne({ username: profile.id }, (err, user) => {
        if (err) return cb(err);
            if (!user) {
                
                var newUser = new User({
                    username: profile.displayName,
                    source: "Google"
                }).save((err, user) => {
                    if (err) throw err;
                    cb(null, user);
                });
            } else {
                cb(null, user);
            }
        });
    }
));

router.get('/github', passport.authenticate('github'));
router.get('/twitter',passport.authenticate('twitter'));
router.get('/google',passport.authenticate('google'));

router.get('/github/callback', passport.authenticate('github', {failiureRedirect: '/'}), function(req, res){
    res.redirect('/');
    console.log('logged in');
});
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
    console.log('logged in');
});
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
    console.log('logged in');
});
module.exports = router;