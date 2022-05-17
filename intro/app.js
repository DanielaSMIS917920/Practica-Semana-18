var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send("Programacion Computaciona IV - Daniela Alvarez - SMIS917920");
})

app.route('/test').get(function(req, res){
    res.send("Pagina de prueba");
})
var server = app.listen(3000, function(){});