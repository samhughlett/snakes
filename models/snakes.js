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
        imageId: String,
        price: String,
        sex: String
    });

module.exports = mongoose.model("Snake", snakeSchema);