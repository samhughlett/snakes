//==========================================
//            PAGE REQUIERMENTS
//========================================== 
const 
        mongoose = require("mongoose");

//==========================================
//                 SCHEMA
//==========================================  
const  videoSchema  = new mongoose.Schema({
        type:  String,
        url: String
    });

module.exports = mongoose.model("Video", videoSchema);