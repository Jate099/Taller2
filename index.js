    var express = require('express');
    var renderEngine = require('express-handlebars');
    var app = express();

    app.use(express.static('public'));
    app.set('view engine', 'handlebars');
    app.engine('handlebars', renderEngine());

    app.get('/', function (req, response) {
        response.sendFile(__dirname + '/public/landing.html');
      });


      app.listen(3000, function () {
        console.log('Aplicación ejemplo, escuchando el puerto 3000!');
      });

