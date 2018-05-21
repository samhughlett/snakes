
module.exports = {
        loggedIn: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect("/snake/login");
        },
        adminCheck: function(req, res, next){
        if (req.isAuthenticated && req.users.isAdmin === true){
            next();}
        }   
};