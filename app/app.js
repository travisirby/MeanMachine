var express = require('express'),
    app = express(),
    path = require ('path');

var mainRouter = require('./routes/mainRouter');

app.use('/', mainRouter);

app.listen(3000);
console.log('app started on port 3000');