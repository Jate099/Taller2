function cargarPag(){

    var rango = document.querySelector('.input-rango');
    
    function buscarPorPrecio(){
        console.log(rango.value);
        location.href = '/tienda/headwear?precio=' + rango.value;
    }
    rango.addEventListener('change', buscarPorPrecio);

}
window.addEventListener('load', cargarPag);