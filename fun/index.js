// module.exports = {
//       error: function(req, res, next){
//             res.render('error');
//         },
        
//         imageUpload: function(req, res, next){
//             if(err) {
//                 console.log(err);
//             }
//             req.body.image = result.secure_url;
//             req.body.imageId = result.public_id;
//         },
        
//         ownerCheck: function(req, res, next) { 
//         if(req.body.user.isAdmin && req.user.isOwner) { 
//             next();
//         } else if (req.body.user.isAdmin && !req.user.isOwner) {
//             res.redirect('/snake');
            
//         } else{
//             req.logout();
//         }
//         },
// };
