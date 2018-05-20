module.exports = {
        loggedIn: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.render("/snakes/login");
        },
        adminCheck: function(req, res, next){
        if (req.isAuthenticated && req.user.isAdmin){
            next();}
        }   
};