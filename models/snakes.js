//==========================================
//            PAGE REQUIERMENTS
//========================================== 
const 
        mongoose = require("mongoose");

//==========================================
//                 SCHEMA
//==========================================  
const  snakeSchema  = new mongoose.Schema({
        type:  String,
        discrip: String,
        image:   String,
        price: String,
        inventory: Number,
        
    });

module.exports = mongoose.model("Snake", snakeSchema);