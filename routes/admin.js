//==========================================
//      Coded by Sam Hughlett
//      Thanks to:
//      My wife
//      Colt Steele
//      Ian Schoonover
//      All my suppporters
//==========================================
require('dotenv').config();
const middle = require('../middleware');
    //==========================================
    //            PAGE REQUIERMENTS
    //==========================================  
    const
        express         = require("express"),
        router          = express.Router(),
        mongoose        = require("mongoose"),
        passport        = require("passport"),    
        Snake           = require("../models/snakes"),
        User            = require("../models/user"),
        multer          = require('multer');
        
    // multer config
    var    storage         = multer.diskStorage({
      filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
      }
    });
    var imageFilter = function (req, file, cb) {
        // accept image files only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };
    var upload = multer({ storage: storage, fileFilter: imageFilter});
    // cloudinary config
    var cloudinary = require('cloudinary');
       cloudinary.config({ 
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
          api_key: process.env.CLOUDINARY_API_KEY, 
          api_secret: process.env.CLOUDINARY_API_SECRET
        });
//==========================================
//                  admin routes
//==========================================

    router.get("/snake/admin/new", middle.loggedIn, function(req, res){
        res.render("admin/new");
    });

    router.post("/snake", middle.loggedIn, upload.single('image'), function(req, res){
        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
            if(err) {
                console.log(err);
            }
            req.body.image = result.secure_url;
            req.body.imageId = result.public_id;
         Snake.create(req.body.snake, function(err, newSnake){
             if (err){
                 res.redirect("/");
             }else{
                 res.redirect("/snake/admin");
             }
         });
     });
    });
    router.get("/snake/panel", middle.loggedIn, function(req, res){
        res.render("admin/panel");
    });
    
    router.get("/snake/admin", middle.loggedIn, function(req, res){
            Snake.find({}, function(err, snakes){
            if (err){
                res.redirect("error");
            }else{
                res.render("admin/admin", {snakes: snakes});
            }
        });
    });

//==========================================
//              EDIT ROUTES 
//==========================================
    router.get("/:id/edit", middle.loggedIn, function(req, res){
        Snake.findById(req.params.id, function(err, foundSnake){
            if (err){
                res.render("error");
            }else{
                res.render("admin/edit", {snakes: foundSnake});
            }
        });
    });
    router.put("/:id", middle.loggedIn, function(req, res){
        Snake.findByIdAndUpdate(req.params.id, req.body.snake, function(err, updatedSnake){
            if (err){
                res.render("error");
            }else{
                res.redirect("/snake/admin");
            }
        });
    });
//===========================================
//              DELETE ROUTES 
//===========================================
    router.delete("/:id", middle.loggedIn, function(req, res){
    Snake.findByIdAndRemove(req.params.id, function(err){
     if(err){
         res.render("error");
     }else{
         res.redirect("/snake/admin");
     }
    });
  });
  
//==========================================
//              VIDEO ROUTES 
//==========================================
    router.get


module.exports = router;