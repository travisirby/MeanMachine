var express = require('express'),
    path = require('path'),
    mainRouter = express.Router();

// serves all static files
mainRouter.use(express.static(path.join(__dirname, '../public')));

// homepage
mainRouter.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// wildcard route, redirect to homepage if file does not exist
mainRouter.get('*', function (req, res) {

        // only redirect on an error or this wildcard route would cancel the apiRoutes
        res.sendFile(path.join(__dirname, '../public', req.params[0]), function (err) {
            if (err) res.redirect('/');
        });

});

module.exports = mainRouter;