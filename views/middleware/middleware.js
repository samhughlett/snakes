function loggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.render("/snakes/login");
}