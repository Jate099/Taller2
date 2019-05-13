function cargarPag() {

    //-----------------menu hamburguesa----------------------------------------
    btnHamburguesa = document.querySelector('.sideMenu__menu-btn');
    cerrarMenu = document.querySelector('.sideMenu__cerrar');
    menu = document.querySelector('.sideMenu');
    main = document.querySelector('.categoria');

    function openSlidebar() {
        menu.style.left = '0';
        main.style.marginLeft = '200px';
        btnHamburguesa.style.display = 'none';
    }
    btnHamburguesa.addEventListener('click', openSlidebar);

    function closeSlidebar() {
        menu.style.left = '-200px';
        main.style.marginLeft = '0';
        btnHamburguesa.style.display = 'block';
    }
    cerrarMenu.addEventListener('click', closeSlidebar);

    //-----------------menu carrito----------------------------------------
    btnCart = document.querySelector('.cart__carrito-btn');
    cartCerrar = document.querySelector('.cart__cerrar');
    menuCart = document.querySelector('.cart');

    function openCart() {
        menuCart.style.right = '0';
        //main.style.marginRight = '300px';
        //btnHamburguesa.style.display = 'none';
    }
    btnCart.addEventListener('click', openCart);

    function closeCart() {
        menuCart.style.right = '-300px';
        //main.style.marginRight = '0';
        //btnHamburguesa.style.display = 'block';
    }
    cartCerrar.addEventListener('click', closeCart);

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
    var listaProducto = [];

    if (localStorage.getItem('listaProducto') != null) {
        listaProducto = JSON.parse(localStorage.getItem('listaProducto'));
    }

    function actualizarCarrito() {
        var suma = 0;

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
            var eliminarProd = document.createElement('button');

            if (listaCarrito != null) {
                listaCarrito.appendChild(contItem);
                contItem.appendChild(imgNuevo);
                contItem.appendChild(nombreNuevo);
                contItem.appendChild(precioNuevo);
                contItem.appendChild(eliminarProd);
            }

            contItem.className = 'cart__item';
            imgNuevo.className = 'cart__img';
            nombreNuevo.className = 'cart__nombre';
            precioNuevo.className = 'cart__precio';
            eliminarProd.className = 'cart__btn-eliminar'

            imgNuevo.style.backgroundImage = 'url(' + producto.imagenes + ')';
            nombreNuevo.innerHTML = producto.nombre;
            precioNuevo.innerHTML = producto.precio;
            eliminarProd.innerHTML = 'eliminar';
            /*cantNuevo.innerHTML = ""+cantidad;
            btnNuevo.innerHTML = '-';
            btnNuevo2.innerHTML = '+';*/

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
    }
    actualizarCarrito();

    console.log(listaProducto.length);

    var carritoBtn = document.querySelectorAll('.item__carritoBtn');

    function recorreBotones(boton) {
        function agergarCarrito() {
            console.log('funcionando')
            var padre = boton.parentNode;
            var nombre = padre.querySelector('.item__nombre').innerText;
            var precio = padre.querySelector('.item__precio').innerText;
            //var imagen = padre.querySelector('.item__img').src;

            var producto = {
                nombre: nombre,
                precio: precio,
                //imagen: imagen,
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
        //var imagen = padre.querySelector('.preview__principal').src;

        var producto = {
            nombre: nombre,
            precio: precio,
            //imagen: imagen,
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
    btnSumar.addEventListener('click', sumarProd);

    function restarProd() {
        contador--;

        cantidad.innerHTML = contador;
        console.log(contador);
    }
    btnMenos.addEventListener('click', restarProd);

}
window.addEventListener('load', cargarPag);