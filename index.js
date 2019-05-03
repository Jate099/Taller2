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

  /*const productos = db.collection('productos');
  productos.find({}, {sort: ['precio']}).toArray(function(err, docs){

    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs.length);
    
    docs.forEach(function(prod){
      console.log(prod.precio);
    });
  });*/

  //client.close();
});

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

  const productos = db.collection('productos');
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

  var query = {};
  if(request.params.categoria){
    query.categoria = request.params.categoria
  }
  /*if(request.params.categoria){
    query.precio = $lte: request.params.precio;
  }*/

  const productos = db.collection('productos');
  productos.find(query).toArray(function(err, docs){
    assert.equal(err, null);

    var contexto = {
      productos: docs
    };

    response.render('categoria', contexto);
    
  });


});

app.get('/tienda/:producto', function (request, response) {
  var context = productos[0];
  console.log(request.params.producto);
  response.render('producto', context);
});


app.listen(3000, function () {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});

