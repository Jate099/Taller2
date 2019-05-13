window.addEventListener('load', function(){
    var titulo = this.document.querySelector('.animacion');

    function hoverTitulo(){
        TweenMax.to(titulo, 1, {x:100});
    }
    titulo.addEventListener('mouseenter', hoverTitulo);

});