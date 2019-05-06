function cargarPag(){

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

}
window.addEventListener('load', cargarPag);