var bodyParser = require("body-parser"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();
passport = require("passport")
LocalStrategy = require("passport-local")
User = require("./models/user")
mongoose.connect("mongodb+srv://jishanmsharif:mis+GDKY5+@cluster0.gtk6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "I am cool",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname:req.body.lastname, 
        sex: req.body.sex, 
        email: req.body.email, 
        avatar: req.body.avatar})
    User.register(newUser, req.body.password, function(err, newUser){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){å
            res.send("authenticated")
        });
    });
})
app.get("/login",function(req, res){
    res.render("login")
})
app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.send("user has been authenticated")
  }
);
app.get("/logout", function(req, res){
    req.logout()
    res.send("User has been signed out")
})

app.listen(process.env.IP, process.env.PORT, function(){
    console.log("SERVER IS RUNNING!");
})