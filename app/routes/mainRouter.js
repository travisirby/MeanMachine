var express = require('express'),
    path = require('path'),
    mainRouter = express.Router();

mainRouter.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

// wildcard route, redirect to homepage if file does not exist
mainRouter.get('*', function (req, res) {

        res.sendFile(path.join(__dirname, '../', req.params[0]), function (err) {
            if (err) res.redirect('/');
        });

});

module.exports = mainRouter;