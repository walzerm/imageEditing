var express = require('express');
var app = express();
var fs = require('fs');
//var routes = require('./routes');

//app.use('/routes', routes);

app.get('/', function(req, res) {
    fs.readFile('../index.html', function(err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    })
})

app.get('/js/imageLoop.js', function(req, res) {
    fs.readFile('../js/imageLoop.js', function(err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    })
})

app.get('/css/style.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    fs.readFile('../css/style.css', function(err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    })
})

app.get('/img/rainier.jpg', function(req, res) {
    fs.readFile('../img/rainier.jpg', function(err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    })
})

app.get('/img/shiba.jpg', function(req, res) {
    fs.readFile('../img/shiba.jpg', function(err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    })
})

app.get('/img/suzzallo.jpg', function(req, res) {
    fs.readFile('../img/suzzallo.jpg', function(err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    })
})

app.listen(8000, function() {
    console.log("Listening on port 8000...");
});
