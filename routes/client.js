require('dotenv').config();

//==========================================
//            PAGE REQUIERMENTS
//==========================================
const
    express         = require("express"),
    router          = express.Router(),
    mongoose        = require("mongoose"),
    Snake           = require("../models/snakes");
    
        require('dotenv').config();
//==========================================
//          CLIENT VIEWABLE ROUTES
//==========================================

    router.get("/aboutus", function(req, res){
        res.render("client/aboutus")
    });

    router.get("/snake", function(req, res){
        Snake.find({}, function(err, snakes){
            if (err){
                res.redirect("error");
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

module.exports = router;