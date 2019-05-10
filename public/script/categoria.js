function cargarPag(){

    btnHamburguesa = document.querySelector('.sideMenu__menu-btn');
    cerrarMenu = document.querySelector('.sideMenu__cerrar');
    menu = document.querySelector('.sideMenu');
    main = document.querySelector('.categoria');

    function openSlidebar(){
        menu.style.left = '0';
        main.style.marginLeft = '200px';
        btnHamburguesa.style.display = 'none';
    }
    btnHamburguesa.addEventListener('click', openSlidebar);

    function closeSlidebar(){
            menu.style.left = '-200px';
            main.style.marginLeft = '0';
            btnHamburguesa.style.display = 'block';
    }
    cerrarMenu.addEventListener('click', closeSlidebar);

    btnCart = document.querySelector('.cart__carrito-btn');
    cartCerrar = document.querySelector('.cart__cerrar');
    menuCart = document.querySelector('.cart');

    function openCart(){
        menuCart.style.right = '0';
        //main.style.marginRight = '300px';
        //btnHamburguesa.style.display = 'none';
    }
    btnCart.addEventListener('click', openCart);
    
    function closeCart(){
        menuCart.style.right = '-300px';
        //main.style.marginRight = '0';
        //btnHamburguesa.style.display = 'block';
    }
    cartCerrar.addEventListener('click', closeCart);

    var rango = document.querySelector('.input-rango');

    function buscarPorPrecio(){
        console.log(rango.value);
        location.href = '/tienda/headwear?precio=' + rango.value;
    }
    if(rango != null){
        rango.addEventListener('change', buscarPorPrecio);
    }

    //botones del carrito en la pagina de categoria
    var listaProducto = [];
    if(localStorage.getItem('listaProducto') != null){
        listaProducto = JSON.parse(localStorage.getItem('listaProducto'));
    }

    var carrito = document.querySelector('.cart__cant');
    //lista de productos en el carrito
    var listaCarrito = document.querySelector('.cart__cartMenu-lista');

    function actualizarCarrito(){
        carrito.innerHTML = listaProducto.length;

        listaCarrito.innerHTML = '';
        listaProducto.forEach(function(producto){
            listaCarrito.innerHTML += '<img src="' + producto.imagen + '" width="50">' + producto.nombre;
        });
    }
    actualizarCarrito();

    console.log(listaProducto.length);

    var carritoBtn = document.querySelectorAll('.item__carritoBtn');

    function recorreBotones(boton){
        function agergarCarrito(){
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

    //funcion para los botones de ageragr al carrito en la pagina producto
    function agrgarCartProduct(){
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
    if(botonPorduct != null){
        botonPorduct.addEventListener('click', agrgarCartProduct);
    }
    
}
window.addEventListener('load', cargarPag);