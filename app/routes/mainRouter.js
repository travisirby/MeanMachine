var express = require('express'),
    path = require('path'),
    mainRouter = express.Router();

mainRouter.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

module.exports = mainRouter;