let passport = require("passport")
let GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
let User = require("../userModel/usersModel")


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {

        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
            let newUser = User({
                username: profile.displayName,
                googleId: profile.id
            })
            await newUser.save()
            return cb(null, newUser)
        }
        else {
            return cb(null, user)
        }
    }
));


passport.serializeUser((user,done)=>{
    done(null, user.id)
})


passport.deserializeUser(async(id, done)=>{
    let user= await User.findById(id)
    if(user)
    {
        done(null, user)
    }
})
