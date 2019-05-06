function cargarPag(){

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

    function actualizarCarrito(){
        carrito.innerHTML = listaProducto.length;
    }
    actualizarCarrito();

    console.log(listaProducto.length);

    var carritoBtn = document.querySelectorAll('.producto__carritoBtn');

    function recorreBotones(boton){
        function agergarCarrito(){
            console.log('funcionando')
            var padre = boton.parentNode;
            var nombre = padre.querySelector('.producto__nombre').innerText;
            var precio = padre.querySelector('.producto__precio').innerText;
            //var imagen = padre.querySelector('.producto__img').src;

            var producto = {
                nombre: nombre,
                precio: precio,
                //imagen: imagen,
            }

            listaProducto.push(producto);

            actualizarCarrito();

            localStorage.setItem('producto', JSON.stringify(producto));
        }
        boton.addEventListener('click', agergarCarrito);
    }
    carritoBtn.forEach(recorreBotones);

    //boton carrito del producto
    var botonPorduct = document.querySelector('.opciones__cart');

    //lista de productos en el carrito
    var listaProd = document.querySelector('.opciones__cartMenu');

    //funcion para los botones de ageragr al carrito en la pagina producto
    function agrgarCartProduct(){
        console.log('funcionando')
            var nombre = document.querySelector('.encabezado__titulo').innerText;
            var precio = document.querySelector('.encabezado__precio').innerText;
            //var imagen = padre.querySelector('.producto__img').src;

            var producto = {
                nombre: nombre,
                precio: precio,
                //imagen: imagen,
            }

            listaProducto.push(producto);

            carrito.innerHTML = listaProducto.length;

            localStorage.setItem('producto', JSON.stringify(producto));
    }
    if(botonPorduct != null){
        botonPorduct.addEventListener('click', agrgarCartProduct);
    }
    
}
window.addEventListener('load', cargarPag);