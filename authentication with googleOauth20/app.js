let express=require("express")
let cors=require("cors")

let passport=require("passport")
let session=require("express-session")
let MongoStore=require("connect-mongo")
require("dotenv").config()
require("./passport/googleOauth20")
let app=express()
app.use(cors())


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:process.env.DB_url,
    collectionName:"sessions"
  })
}))


app.use(passport.initialize())
app.use(passport.session())


app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/view/home.html")
})


let isLoggedin=(req,res,next)=>{
    if(req.isAuthenticated())
    {
        return res.redirect("/profile")
    }
    return next()
}

app.get("/login", isLoggedin, (req,res)=>{
       res.sendFile(__dirname + "/view/login.html")
})


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',
successRedirect:"/profile" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



let checkIsLogged=(req,res,next)=>{
    if(req.isAuthenticated()){
       return next()
    }
    return res.redirect("/login")
}

app.get("/profile", checkIsLogged, (req,res)=>{
        res.sendFile(__dirname + "/view/profile.html")
})


app.get("/logout",(req,res)=>{
    req.logOut(()=>{
        res.redirect("/")
    })
})



module.exports=app
