var express = require('express'),
    apiRouter = express.Router(),
    jwt = require('jsonwebtoken'),
    jwtSecret = 'thisIsASecretForOurTokens',
    User = require('./../models/user');


// route for authenticating
apiRouter.post('/authenticate', function(req, res) {
    User.findOne({
        username: req.body.username
    }).select('name username password').exec(function(err, user){
        if (err) throw err;
        // username not found
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.'});
        }
        else if (user) {
            // check password
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.'});
            } else {
                // username found and password correct, create jwt token
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, jwtSecret, {
                    expiresInMinutes: 1440 // token expires in 24 hrs
                });

                res.json({
                    success: true,
                    message: 'Token delivered Successfully',
                    token: token
                });
            }
        }
    })
});

// middleware used by all requests
apiRouter.use(function (req, res, next) {

    // check for token from header, url or post params
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if (token) {
        // verify secret and check expiration
        jwt.verify(token, jwtSecret, function(err, decoded){
            if (err){
                return res.status(403).send({ success: false, message: 'Failed to authenticate token.'});
            } else {
                // save request for use in other routes
                req.decoded = decoded;
                console.log('connected to chatbouttv api');
                next();
            }
        });
    } else {
        return res.status(403).send({ success: false, message: 'No token provided.'});
    }
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

    // get user with specified id
    .get(function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if (err) res.send(err);

            res.json(user);
        });
    })

    // update user with specified id
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
    })

    // delete user with specified id
    .delete(function(req, res){
       User.remove({
           _id: req.params.user_id

       }, function(err, user){
           if (err) return res.send(err);
           res.json({ message: 'User successfully deleted'});
       });
    });

apiRouter.get('/me', function(req, res){
    res.send(req.decoded);
});

module.exports = apiRouter;