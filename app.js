require('dotenv').config();
const
//==========================================
//            PAGE REQUIERMENTS
//==========================================  
    express         = require("express"), 
    app             = express(),
    method          = require("method-override"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    Snake           = require("./models/snakes"),
    User            = require("./models/user"),
    Video            = require("./models/videos"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local");
//==========================================
//                  CONFIG
//==========================================
    app.set("view engine", "ejs");
    mongoose.connect("mongodb://localhost/swmo");
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(method("_method"));
    app.use(require("express-session")({
            secret: process.env.SESSION,
            resave: false,
            saveUninitialized: false
        }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(function (req, res, next){
            res.locals.currentUser = req.user;
        next();
    });
//==========================================
//                  ROUTES
//==========================================

//landing page
app.get("/", function(req, res){
    res.render("client/index");
});
const   
    adminRoutes     = require("./routes/admin"),
    clientRoutes    = require("./routes/client");
    app.use(adminRoutes);
    app.use(clientRoutes);
//==========================================
//          SERVER CONECTION 
//==========================================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("dont let this slither away"); 
});