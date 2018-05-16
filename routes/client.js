const
//==========================================
//            PAGE REQUIERMENTS
//==========================================

    express         = require("express"),
    router          = express.Router(),
    mongoose        = require("mongoose"),
    Snake           = require("../models/snakes");
//==========================================
//          CLIENT VIEWABLE ROUTES
//==========================================

    router.get("/snake", function(req, res){
        Snake.find({}, function(err, snakes){
            if (err){
                res.redirect("error");
            }else{
                res.render("snakes", {snakes: snakes});
            }
        });
    });

    router.get("/snake/:id", function(req, res){
        Snake.findById(req.params.id, function(err, foundSnake){
            if (err){
                res.render("error");
            }
            else{
                res.render("buy", {snakes: foundSnake});
            }
        });
     });

module.exports = router;