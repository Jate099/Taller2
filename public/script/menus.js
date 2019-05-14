window.addEventListener('load', function(){

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

});