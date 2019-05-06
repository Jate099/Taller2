function cargarPag(){
  var modal = document.querySelector('.modal');
  var boton = document.querySelector('.boton-modal');
  var span = document.querySelector('.modal__close');
  var navbar = document.querySelector('.app__header');

  var contador = 0;
  var imagenes = [
    './imagenes/info2-1.jpg',
    './imagenes/info2-2.jpg',
    './imagenes/info2-3.jpg',
  ];

  var banner = document.querySelector('.slider__banner');
  var btnSlider = document.querySelectorAll('.slider__btn-img');

  banner.style.background = 'url(' + imagenes[contador] + ')';

  function recorrerBotones(img, index){
    
    function clickBoton(){
      contador = index;

      if(btnSlider [0] && contador >=  imagenes.length){
        contador = 0;
      }

      banner.style.background = 'url(' + imagenes[contador] + ')';
    }
    img.addEventListener('click', clickBoton);
  }
  btnSlider.forEach(recorrerBotones);
  
  var contenido = document.querySelectorAll('.tickets__contenido');
  var btnTicket = document.querySelectorAll('.tickets__Btn');

  function recorrerBtns(boton, index){
    function mostrarSeccion(event){
        contenido.forEach(function (contenido){
            contenido.style.display = 'none';
        });
        contenido[index].style.display = 'block';
    }
    boton.addEventListener('click', mostrarSeccion);
}
btnTicket.forEach(recorrerBtns);


function cambioNav(event){
    if(scrollY >= 200){
      navbar.style.transition = 'background-color 0.2s linear';
      //navbar.style.backdrop-filter = 'blur(2px)';
      navbar.style.background = 'rgba(82, 14, 65, 0.829)';
    }else{
      navbar.style.background = 'none';
    }
  }
  window.addEventListener('scroll', cambioNav);

  
  function abrirModal(){
      modal.style.display = 'block';
  }
  boton.addEventListener('click', abrirModal);
  
  /*function cerrarModal(){
    modal.style.display = 'none';
    //console.log(modal);
  }
  span.addEventListener('click', cerrarModal);*/
  
  window.onclick = function(event) {
    if (event.target == modal) {
       modal.style.display = "none";
    }
  }
}
window.addEventListener('load', cargarPag);


