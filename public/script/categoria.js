function cargarPag() {

    //-----------------filtro precio----------------------------------------
    var rango = document.querySelector('.input-rango');

    function buscarPorPrecio() {
        console.log(rango.value);
        location.href = '/tienda/headwear?precio=' + rango.value;
    }
    if (rango != null) {
        rango.addEventListener('change', buscarPorPrecio);
    }

    //-----------------carrito de compras----------------------------------------
    //botones del carrito en la pagina de categoria
    var carrito = document.querySelector('.cart__cant');
    //lista de productos en el carrito
    var listaCarrito = document.querySelector('.cart__cartMenu-lista');
    var totalCompra = document.querySelector('.cart__valorTotal');
    var listaProducto = [];

    if (localStorage.getItem('listaProducto') != null) {
        listaProducto = JSON.parse(localStorage.getItem('listaProducto'));
    }

    function actualizarCarrito() {
        var suma = 0;
        var valor = 0;
        var cantidad = 1;

        //numero de elementos en el carrito
        carrito.innerHTML = listaProducto.length;

        if (listaCarrito != null) {
            listaCarrito.innerHTML = '';
        }

        listaProducto.forEach(function (producto, index) {
            //listaCarrito.innerHTML += '<div class="cart__item"><img class="cart__img" src="' + producto.imagenes + '" width="50"><p class="cart__nombre">'+ producto.nombre +'</p><p class="cart__precio">'+ producto.precio +'</p></div>';

            var contItem = document.createElement('div');
            var imgNuevo = document.createElement('div');
            var nombreNuevo = document.createElement('p');
            var precioNuevo = document.createElement('p');
            var btnNuevo = document.createElement('button');
            var eliminarProd = document.createElement('button');
            var cantNuevo = document.createElement('p');

            if (listaCarrito != null) {
                listaCarrito.appendChild(contItem);
                contItem.appendChild(imgNuevo);
                contItem.appendChild(nombreNuevo);
                contItem.appendChild(btnNuevo);
                contItem.appendChild(precioNuevo);
                contItem.appendChild(eliminarProd);
                contItem.appendChild(cantNuevo);
            }

            contItem.className = 'cart__item';
            imgNuevo.className = 'cart__img';
            nombreNuevo.className = 'cart__nombre';
            precioNuevo.className = 'cart__precio';
            eliminarProd.className = 'cart__btn-eliminar';
            cantNuevo.className = 'cart__cantidad';
            btnNuevo.className = 'cart__agregCantidad';

            imgNuevo.style.backgroundImage = 'url(' + producto.imagen + ')';
            nombreNuevo.innerHTML = producto.nombre;
            precioNuevo.innerHTML = producto.precio;
            eliminarProd.innerHTML = 'eliminar';
            cantNuevo.innerHTML = "" + cantidad;
            btnNuevo.innerHTML = '+';
            //btnNuevo2.innerHTML = '-';

            /*var temp = new String();
            for (let i = 1; i < producto.precio.length; i++) {
                temp += producto.precio[i];
            }
            suma += parseInt(temp);

            btnNuevo.addEventListener('click', function () {
                cantidad++;
                cantNuevo.innerHTML = "" + cantidad;
                listaProducto.push(producto);
                localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
                var temp = new String();
                for (let i = 1; i < producto.precio.length; i++) {
                    temp += producto.precio[i];
                    suma += parseInt(temp);
                }
               
                totalCompra.innerHTML = "$" + suma;

            });*/


            //eliminar producto del carrito
            function eliminarProdCart() {

                listaProducto.splice(index, 1);
                contItem.remove();
                localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
                //carrito.innerHTML = listaProducto.length;
                actualizarCarrito();

            }
            if (eliminarProd != null) {
                eliminarProd.addEventListener('click', eliminarProdCart);
            }


        });
        actualizarNumeroCarrito();
    }
    actualizarCarrito();


    //-------------------------------------------------------------------------------------------

    var carritoBtn = document.querySelectorAll('.item__carritoBtn');

    function recorreBotones(boton) {
        function agergarCarrito() {
            console.log('funcionando');
            let abuelo = boton.parentNode
            var padre = abuelo.parentNode;

            var nombre = padre.querySelector('.item__nombre').innerText;
            var precio = padre.querySelector('.item__precio').innerText;
            var imagen = padre.querySelector('.item__img').src;

            var producto = {
                nombre: nombre,
                precio: precio,
                imagen: imagen
            }

            listaProducto.push(producto);

            actualizarCarrito();

            localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
        }
        boton.addEventListener('click', agergarCarrito);
    }
    carritoBtn.forEach(recorreBotones);

    //boton carrito del producto
    var botonPorduct = document.querySelector('.opciones__cart');
    var btnSumar = document.querySelector('.cantidad__mas');
    var btnMenos = document.querySelector('.cantidad__menos');

    //funcion para los botones de ageragr al carrito en la pagina producto
    function agrgarCartProduct() {
        console.log('funcionando')
        var nombre = document.querySelector('.encabezado__titulo').innerText;
        var precio = document.querySelector('.encabezado__precio').innerText;
        var imagen = document.querySelector('.preview__principal').src;

        var producto = {
            nombre: nombre,
            precio: precio,
            imagen: imagen,
        }

        listaProducto.push(producto);

        //carrito.innerHTML = listaProducto.length;
        actualizarCarrito();

        localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
    }
    if (botonPorduct != null && btnSumar != null) {
        botonPorduct.addEventListener('click', agrgarCartProduct);
        btnSumar.addEventListener('click', agrgarCartProduct);
    }

    //eliminar producto del carrito
    /*function eliminarProdCart(){
        var nombre = document.querySelector('.encabezado__titulo').innerText;
            var precio = document.querySelector('.encabezado__precio').innerText;
            //var imagen = padre.querySelector('.preview__principal').src;

            var producto = {
                nombre: nombre,
                precio: precio,
                //imagen: imagen,
            }

            listaProducto.splice(producto, 1);

            //carrito.innerHTML = listaProducto.length;
            actualizarCarrito();

            localStorage.removeItem('listaProducto', JSON.stringify(listaProducto));
    }
    if(btnMenos != null){
        btnMenos.addEventListener('click', eliminarProdCart);
    }*/

    var cantidad = document.querySelector('.cantidad__contador');
    var contador = 0;

    function sumarProd() {
        contador++;

        cantidad.innerHTML = contador;
        console.log(contador);

    }
    if (btnSumar != null)
        btnSumar.addEventListener('click', sumarProd);

    function restarProd() {
        contador--;

        cantidad.innerHTML = contador;
        console.log(contador);
    }
    if (btnMenos != null)
        btnMenos.addEventListener('click', restarProd);


    //-------------valor total del carrito--------------------------------------------

    function actualizarNumeroCarrito() {

        let precios = document.querySelectorAll(".cart__precio");
        let precio_total = 0;
        precios.forEach((p) => {
            let convertir = ((p.innerText).replace("$", "")).replace(" ", "")
            let numero = parseFloat(convertir);
            precio_total += Math.round(numero, 2);
            
        });

        let contenedor__precio = document.querySelector(".cart__valorTotal");
        contenedor__precio.innerHTML = precio_total;
    }

        actualizarNumeroCarrito();

    }
    window.addEventListener('load', cargarPag);