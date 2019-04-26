var express = require('express');
var renderEngine = require('express-handlebars');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', renderEngine());

var productos = [];

productos.push({
titulo: 'Producto 1',
precio: '39.99',
imgPrincipal: 'https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/5c3871215bafe83b078adbe3/perro.jpg',
descrip: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia sapiente iste, atque, cumque vero expedita consectetur, voluptatum soluta molestias ipsam natus veritatis est blanditiis corporis eveniet vel perspiciatis aspernatur quas?'});

productos.push({
  titulo: 'tu qlooo2',
  precio: '10',
  imagen: 'https://www.infobae.com/new-resizer/kAjCyEfwdw0H57sLGDM5OOrTFUI=/750x0/filters:quality(100)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/04/06155038/perro-beso-1024x576.jpg',
  descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia sapiente iste, atque, cumque vero expedita consectetur, voluptatum soluta molestias ipsam natus veritatis est blanditiis corporis eveniet vel perspiciatis aspernatur quas?',
});


app.get('/', function (req, response) {
  response.sendFile(__dirname + '/public/landing.html');
});

app.get('/tienda', function (req, response) {
  response.render('tienda');
});

app.get('/tienda/:producto', function (request, response) {
  var context = productos[0];
  console.log(request.params.producto);
  response.render('producto', context);
});


app.listen(3000, function () {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});

