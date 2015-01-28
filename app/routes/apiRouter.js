var express = require('express'),
    apiRouter = express.Router(),
    User = require('./../models/user');

apiRouter.use(function (req, res, next) {
    console.log('connected to chatbouttv api');
    next();
});

apiRouter.get('/', function(req, res){
    res.json({ message: 'welcome to chatbouttv api'});
});

apiRouter.route('/users')

    .post(function(req,res){

        // create new instance of the User model
        var user = new User();

        // set user information (comes from the request)
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        // save the user and check for errors
        user.save(function(err){
            if (err){
                if (err.code == 11000) {
                    return res.json({
                        success: false,
                        message: 'Username already exists.'
                    });
                } else {
                    return res.send(err);
                }
            }
            // return a success message
            res.json({ message: 'user created'});
        });
    })

    .get(function(req,res) {

        User.find(function(err, users){

            if (err) res.send(err);

            // return all users
            res.json(users);
        });

    });

apiRouter.route('/users/:user_id')

    .get(function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if (err) res.send(err);

            res.json(user);
        });
    })

    .put(function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if (err) res.send(err);

            // update the users info only if it is new
            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            //save the user
            user.save(function(err){
                if (err) return res.send(err);
                res.json({ message: 'User updated'});
            });
        });
    });

module.exports = apiRouter;