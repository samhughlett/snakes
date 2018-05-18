
//==========================================
//            PAGE REQUIERMENTS
//==========================================  
const
    express         = require("express"),
    router          = express.Router(),
    mongoose        = require("mongoose"),
    passport        = require("passport"),    
    Snake           = require("../models/snakes"),
    User            = require("../models/user");
//==========================================
//            actual admin routes
//==========================================

router.get("/snake/new", loggedIn, function(req, res){
    res.render("new");
});

router.get("/snake/admin", loggedIn, function(req, res){
        Snake.find({}, function(err, snakes){
        if (err){
            res.redirect("error");
        }else{
            res.render("admin", {snakes: snakes});
        }
    });
});
//==========================================
//          Login/Logout ROUTES
//==========================================
router.get("/login", function(req, res){
    res.render("client/login");
});
router.post("/login", passport.authenticate("local", 
    { 
        successRedirect: '/admin', 
        failureRedirect: '/login' 
    }), function(req, res){});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/snake");
});

//==========================================
//          Sign up ROUTES
//==========================================

router.get("/signup", function(req, res){
  res.render("client/signup");
});

router.post("/signup", function(req, res){
    req.body.username;
    req.body.password;
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("error");
            }
        passport.authenticate("local")(req, res, function(){
           return res.redirect("/snake");
            });
            console.log("username is: "+req.body.username);
            console.log("password is: "+req.body.password);
        });
    });
//==========================================
//              EDIT ROUTES 
//===========================================
router.get("/snake/:id/admin/edit", loggedIn, function(req, res){
    Snake.findById(req.params.id, function(err, foundSnake){
        if (err){
            res.render("error");
        }else{
            res.render("edit", {snakes: foundSnake});
        }
    });
});

router.put("/snake/:id", loggedIn, function(req, res){
    Snake.findByIdAndUpdate(req.params.id, req.body.snake, function(err, updatedSnake){
        if (err){
            res.render("error");
        }else{
            res.redirect("/snake/admin");
        }
    });
});
//==========================================================
//                      POST ROUTES
//==========================================================
 router.post("/snake", loggedIn, function(req, res){
     Snake.create(req.body.snake, function(err, newSnake){
         if (err){
             res.redirect("/");
         }else{
             res.redirect("/snake/admin");
         }
     });
 });
//==========================================
//              DELETE ROUTES 
//===========================================
 router.delete("/snake/:id", loggedIn, function(req, res){
     console.log("delete hit");
    Snake.findByIdAndRemove(req.params.id, function(err){
     if(err){
         res.render("error");
     }else{
         res.redirect("/snake/admin");
     }
    });
  });
//===========================================
//           Middleware
//===========================================

function loggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;