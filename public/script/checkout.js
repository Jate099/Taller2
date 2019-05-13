window.addEventListener('load', function(){

    var form = document.querySelector('form');

    function enviarProds(event){
        //event.preventDefault();

        var input = document.querySelector('.input-productos');
        input.value = localStorage.getItem('listaProducto');

        localStorage.removeItem('listaProducto');
    }
    form.addEventListener('submit', enviarProds);

});