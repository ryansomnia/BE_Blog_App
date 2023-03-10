const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user,  done) {
    done(null, user)
    
})
passport.deserializeUser(function (user, done) {
    done(null, user)
})
passport.use(new GoogleStrategy({
    clientID:"195963236368-vkfgk0kvt9kumj5qa8961ireklfs780i.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:3000/oauth2/redirect/google",
    passReqToCallback:true
},function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile)
})
)