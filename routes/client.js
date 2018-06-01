//==========================================
//      Coded by Sam Hughlett
//      Thanks to:
//      My wife
//      Colt Steele
//      Ian Schoonover
//      All my suppporters
//==========================================
require('dotenv').config();

//==========================================
//            PAGE REQUIERMENTS
//==========================================
const
    express         = require("express"),
    router          = express.Router(),
    mongoose        = require("mongoose"),
    middle          = require('../middleware'),
    User            = require("../models/user"),
    passport        = require("passport"),
    Snake           = require("../models/snakes");
//==========================================
//          CLIENT VIEWABLE ROUTES
//==========================================
    router.get("/snake/users/:id", function(req, res){
        res.render("client/profile")
    });
    
    router.get("/aboutus", function(req, res){
        res.render("client/aboutus")
    });

    router.get("/snake", function(req, res){
        Snake.find({}, function(err, snakes){
            if (err){
                res.redirect("/error");
            }else{
                res.render("client/snakes", {snakes: snakes});
            }
        });
    });

    router.get("/snake/:id", function(req, res){
        Snake.findById(req.params.id, function(err, foundSnake){
            if (err){
                res.render("error");
            }
            else{
                res.render("client/buy", {snakes: foundSnake});
            }
        });
     });
//==========================================
//          Login/Logout ROUTES
//==========================================
router.get("/login", function(req, res){
    res.render("client/login");
});

router.post("/snake/login", passport.authenticate("local", 
    { 
        successRedirect: '/snake', 
        failureRedirect: '/login' 
    }), function(req, res){});

router.get("/logout", middle.loggedIn, function(req, res) {
    req.logout();
    res.redirect("/snake");
});

//==========================================
//          Sign up ROUTES
//==========================================

router.get("/signup", function(req, res){
  res.render("client/signup");
});

router.post("/snake/signup", function(req, res){
//console.log -here is really not good for security.
//as it could show sinsitive information.
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("error");
            }
        passport.authenticate("local")(req, res, function(){
           return res.redirect("/snake");
            });
        });
    });
module.exports = router;