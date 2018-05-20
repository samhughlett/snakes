
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
    multer          = require('multer'),
    storage         = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
}),
 imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
},
 upload = multer({ storage: storage, fileFilter: imageFilter}),

cloudinary = require('cloudinary');
    cloudinary.config({ 
      cloud_name: 'backbonewebdev', 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

//==========================================
//            actual admin routes
//==========================================

router.get("/snake/admin/new", function(req, res){
    res.render("admin/new");
});

router.get("/snake/admin", function(req, res){
        Snake.find({}, function(err, snakes){
        if (err){
            res.redirect("error");
        }else{
            res.render("admin/admin", {snakes: snakes});
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
        failureRedirect: '/login' 
    }), function(req, res){});

router.get("/snake/logout", function(req, res) {
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
    var newUser= new User({username: req.body.username, email: req.body.email});
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
//==========================================
//              EDIT ROUTES 
//===========================================
router.get("/snake/:id/edit", loggedIn, function(req, res){
    Snake.findById(req.params.id, function(err, foundSnake){
        if (err){
            res.render("error");
        }else{
            res.render("admin/edit", {snakes: foundSnake});
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
 router.post("/snake",  function(req, res){
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
    res.redirect("/snake/login");
}

module.exports = router;