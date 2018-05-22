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

    router.get("/snake/aboutus", function(req, res){
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

    router.get("/:id", function(req, res){
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
router.get("/snake/login", function(req, res){
    res.render("client/login");
});

router.post("/snake/login", passport.authenticate("local", 
    { 
        successRedirect: '/snake', 
        failureRedirect: '/snake/login' 
    }), function(req, res){});

router.get("/snake/logout", middle.loggedIn, function(req, res) {
    req.logout();
    res.redirect("/snake");
});

//==========================================
//          Sign up ROUTES
//==========================================

router.get("/snake/signup", function(req, res){
  res.render("client/signup");
});

router.post("/snake/signup", function(req, res){
    req.body.username;
    req.body.password;
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