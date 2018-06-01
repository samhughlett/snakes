
module.exports = {
        loggedIn: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
        },
        
        adminCheck: function(req, res, next){
        if(req.body.user.isAdmin && req.user.isAdmin === true){
            next();}
        },
        ownerCheck: function(req, res, next) { 
        if(req.body.user.isAdmin && req.user.isOwner === ture) { 
            
            
        } else if{
            
            
        } else{
            
            next(); 
        }
};