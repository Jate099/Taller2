var express = require('express');
var renderEngine = require('express-handlebars');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'tienda';
const client = new MongoClient(url);

var db = null;

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);

  //client.close();
});

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', renderEngine());

var productos = [];

/*productos.push({
titulo: 'Producto 1',
precio: '39.99',
imgPrincipal: 'https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/5c3871215bafe83b078adbe3/perro.jpg',
descrip: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia sapiente iste, atque, cumque vero expedita consectetur, voluptatum soluta molestias ipsam natus veritatis est blanditiis corporis eveniet vel perspiciatis aspernatur quas?'});

productos.push({
  titulo: 'tu qlooo2',
  precio: '10',
  imagen: 'https://www.infobae.com/new-resizer/kAjCyEfwdw0H57sLGDM5OOrTFUI=/750x0/filters:quality(100)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/04/06155038/perro-beso-1024x576.jpg',
  descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia sapiente iste, atque, cumque vero expedita consectetur, voluptatum soluta molestias ipsam natus veritatis est blanditiis corporis eveniet vel perspiciatis aspernatur quas?',
});*/

app.get('/', function (req, response) {
  response.sendFile(__dirname + '/public/landing.html');
});

app.get('/tienda', function (req, response) {

  var productos = db.collection('productos');
  productos.find({}, {sort: ['precio']}).toArray(function(err, docs){
    assert.equal(err, null);

    var contexto = {
      productos: docs
    };

    response.render('tienda', contexto);
    
  });

});

app.get('/tienda/:categoria?', function (request, response) {
  
  console.log(request.params.categoria);
  //console.log(request.query.precio);

  var query = {};
  if(request.params.categoria){
    query.categoria = request.params.categoria;
  }
  if(request.query.precio){
    query.precio = { $lte: parseInt(request.query.precio) };
}

  var productos = db.collection('productos');

  productos.find(query).toArray(function(err, docs){
    assert.equal(err, null);

    var contexto = {
      productos: docs,
      categoria: request.params.categoria,
      precio: request.query.precio,
      esHeadwear: request.params.categoria == "headwear",
      esSweaters: request.params.categoria == "sweaters",
      esJewelry: request.params.categoria == "jewelry",
      esT_shirts: request.params.categoria == "t-shirts",
    };

    response.render('categoria', contexto);
    
  });

});

app.get('/tienda/producto/:nombre', function (request, response) {
  console.log(request.params.nombre);
  //console.log(request.query.precio);

  /*var query = {};
  if(request.params.nombre){
    query.nombre = request.params.nombre;
  }
  if(request.query.precio){
    query.precio = { $lte: request.query.precio };
}*/

  var productos = db.collection('productos');

  productos.find({nombre: request.params.nombre}).toArray(function(err, docs){
    assert.equal(err, null);

    var contexto = {
      producto: docs[0],
      /*nombre: request.params.nombre,
      precio: request.query.precio,
      esHeadwear: request.params.categoria == "headwear",
      esSweaters: request.params.categoria == "sweaters",
      esJewelry: request.params.categoria == "jewelry",*/
    };

    response.render('producto', contexto);
    
  });
});


app.listen(3000, function () {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});

