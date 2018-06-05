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
                username: String,
                password: String,
                email: String,
                phone: String,
                isAdmin: {type: Boolean, default: false},
                isOwner: {type: Boolean, default:false},
                isFavUser: {type: Boolean, default:false}
                
            });
        UserSchema.plugin(passportLocalMongoose);
        module.exports = mongoose.model("User", UserSchema);