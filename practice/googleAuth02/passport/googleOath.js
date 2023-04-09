let User=require("../model/usersModel")
require("dotenv").config()
let passport=require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

    let user= await User.findOne({ googleId: profile.id })
    if(!user){
        let newUser= User({
            username: profile.displayName,
            googleId: profile.id
        })
     newUser.save()
    return cb(null, newUser)
    }

    else {
        cb(null, user)
    }
  
  }
));


passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id,done)=>{
 
   let user=await User.findById(id)
   if(user)
   {
    done(null, user)
   }

})

