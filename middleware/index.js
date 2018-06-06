
module.exports = {
        loggedIn: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
        },
        
        adminCheck: function(req, res, next){
        if(req.isAuthenticated() && req.user.isAdmin){
            next()
            ;}
        },
        
        ownerCheck: function(req, res, next) { 
        if(req.body.user.isAdmin && req.user.isOwner) { 
            next();
        } else if (req.body.user.isAdmin && !req.user.isOwner) {
            res.redirect('/snake');
            
        } else{
            req.logout();
        }
        },
};


