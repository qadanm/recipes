var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var UserProfile = require('../models/user-profile')

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb){
        // A user has logged in with OAuth...
        UserProfile.findOne({googleId: profile.id}, function(err, userProfile){
            if (err) return cb(err);
            if (userProfile) {
                return cb(null, userProfile)
            } else {
                // we have a first time user via Oauth
                var newUserProfile = new UserProfile ({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                });
                newUserProfile.save(function(err){
                    if(err) return cb(err);
                    return cb(null,newUserProfile);
                });
            }
        });
    }
));

passport.serializeUser(function(userProfile, done){
    done(null, userProfile.id);
});

passport.deserializeUser(function(id, done){
    UserProfile.findById(id, function (err, userProfile){
        done(err, userProfile);
    });
});