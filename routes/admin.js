
//==========================================
//            PAGE REQUIERMENTS
//==========================================  
const
    express         = require("express"),
    router          = express.Router(),
    mongoose        = require("mongoose"),
    Snake           = require("../models/snakes");
//==========================================
//            actual admin routes
//==========================================
router.get("/snake/admin/new", loggedIn, function(req, res){
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