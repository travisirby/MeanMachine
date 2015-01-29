var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 3000;

// mongodb
mongoose.connect('localhost:27017/chatbouttv');

// body parser grabs info from POST requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// handling CORS requests
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// routing
var mainRouter = require('./app/routes/mainRouter'),
    apiRouter = require('./app/routes/apiRouter');

app.use('/api', apiRouter);
app.use('/', mainRouter);

app.listen(port);
console.log('app started on port 3000');