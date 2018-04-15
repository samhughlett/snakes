var 
//################ APP VARS #####################  

    express     = require("express"), 
    app         = express(),
    method      = require("method-override"),
    express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
//################ Mongo Schema #####################  
    snakeSchema  = new mongoose.Schema({
        type:  String,
        discrip: String,
        image:   String,
        price: String,
        inventory: Number,
        
    }),
    Snake = mongoose.model("snake", snakeSchema);
    
//################## Site  Set Up #################  
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/swmo_snakes");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(method("_method"));

//#####################  Routes Table  ###################
app.get("/", function(req, res){
    res.render("index")
});

app.get("/snake", function(req, res){
    Snake.find({}, function(err, snakes){
        if (err){
            res.redirect("error");
        }else{
            res.render("snakes", {snakes: snakes})
        }
    })
});


app.get("/snake/admin/new", function(req, res){
    res.render("new");
});

app.get("/snake/admin", function(req, res){
        Snake.find({}, function(err, snakes){
        if (err){
            res.redirect("error");
        }else{
            res.render("admin", {snakes: snakes})
        }
    })
});


 app.get("/snake/:id", function(req, res){
    Snake.findById(req.params.id, function(err, foundSnake){
        if (err){
            res.render("error")
        }
        else{
            res.render("buy", {snakes: foundSnake});
        }
    })
 });

 app.delete("/snake/:id", function(req, res){
     console.log("delete hit")
    Snake.findByIdAndRemove(req.params.id, function(err){
     if(err){
         res.render("error")
     }else{
         res.redirect("/snake/admin")
     }
    });
  })


//#####################  Post Table  #####################
// creates a new post
 app.post("/snake", function(req, res){
     Snake.create(req.body.snake, function(err, newSnake){
         if (err){
             res.redirect("/");
         }else{
             res.redirect("/snake/admin");
         }
     });
 });
//############################### edit a post ############
app.get("/snake/:id/edit", function(req, res){
    Snake.findById(req.params.id, function(err, foundSnake){
        if (err){
            res.render("error")
        }else{
            res.render("edit", {snakes: foundSnake});
        }
    });
})
app.put("/snake/:id", function(req, res){
    Snake.findByIdAndUpdate(req.params.id, req.body.snake, function(err, updatedSnake){
        if (err){
            res.render("error");
        }else{
            res.redirect("/snake/admin");
        }
    })

});


//#####################  dont edit below ##################
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("dont let this slither away"); 
});