function cargarPagina() {

    var express = require('express');
    var renderEngine = require('express-handlebars');
    var app = express();

    app.use(express.static('public'));
    app.set('view engine', 'handlebars');
    app.engine('handlebars', renderEngine());

}
window.addEventListener('load', cargarPagina);