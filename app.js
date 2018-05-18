const
//################ APP VARS #####################  

    express         = require("express"), 
    app             = express(),
    method          = require("method-override"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    Snake           = require("./models/snakes"),
    User            = require("./models/user"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local");
//=================================================

//################## Site  Set Up #################  
    app.set("view engine", "ejs");
    mongoose.connect("mongodb://localhost/swmo");
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(method("_method"));
    app.use(require("express-session")({
            secret: "Free Camping Is The Best",
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
//#####################  Routes Table  ###################

//landing page
app.get("/", function(req, res){
    res.render("client/index");
});
const   
    adminRoutes      = require("./routes/admin"),
    clientRoutes    = require("./routes/client");
    app.use(adminRoutes);
    app.use(clientRoutes);
//#####################  dont edit below ##################
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("dont let this slither away"); 
});