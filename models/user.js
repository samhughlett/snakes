//==========================================
//            PAGE REQUIERMENTS
//========================================== 
const 
        mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose"),
//==========================================
//                 SCHEMA
//========================================== 
        UserSchema  = new mongoose.Schema({
                name: String,
                password: String,
                email: String,
                isAdmin: {type: Boolean, default: false}
                
            });
        UserSchema.plugin(passportLocalMongoose);
        module.exports = mongoose.model("User", UserSchema);