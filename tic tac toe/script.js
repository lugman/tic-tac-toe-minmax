
var casillas = [];
const tipo = {vacia:0, ocupada:1};
const jugador = {X:"X",O:"O"};
const imagenes = {x:"img/borrar.png",o:"img/o.png"}

var comienzo =  true;
var turno = null;


window.onload = function() {


    let i=0;
    let j=0;
    const tablero = document.getElementsByClassName("col");
    tablero.forEach(function(element,index){

          element.addEventListener("click",function(e){
            marcarCasilla(e);
          });
      
         casillas.push(new valoresCelda(element,tipo.vacia,null,[i++,j]));

         if(i==3){
            j++;
            i=0;
         }         
    });

    document.getElementById("comenzar").addEventListener("click",function(){

      const empty = (element) => element.every( el => el  == vacio);

      let reStart = false;
  
      reStart = casillas.some(el => el.tipo == tipo.ocupada)
    
      console.log(reStart);

      if(reStart)
         location.reload();
        
        let radioStart   = document.getElementById("machine");      

        comienzo =  radioStart.checked 
      
        comenzarPartida();
    });



  };

  function valoresCelda(el,tip,jug,pos){
      this.elemento=el;
      this.tipo=tip;
      this.jugador=jug;
      this.posicion=pos
  }

  function estaVacia(elemento){
    return elemento.tipo == tipo.vacia
  }
  function ocupar(elemento,jugador){
     elemento.tipo = tipo.ocupada;
     elemento.jugador = jugador;
     ponerImagen(elemento.elemento,jugador);
}



function ponerImagen(element,jug) {
    let img = document.createElement('img');
    img.src = jugador.X === jug ? imagenes.x: imagenes.o;
    element.innerHTML="";
    element.appendChild(img);
} 


function comenzarPartida(){
    if(comienzo) {
      ocupar(casillas[4],jugador.X);
      turno = jugador.O;
      
    } else{
      turno = jugador.O;
    }
}

function marcarCasilla(e){
  
  let busqueda = casillas.find(elem=>elem.elemento == e.target);
  if(busqueda != undefined && estaVacia(busqueda)){
    ocupar(busqueda,jugador.O);
    turno = jugador.X;
    tablero = generarTablero(); 
    if(evaluate(tablero) == 0){
      let pos =  buscarMejorMovimiento(tablero);
      trasladarOcupar(pos);
    } 
  }
}

function generarTablero(){
  let t = [["V","V","V"],["V","V","V"],["V","V","V"]];
  casillas.forEach(a => {
    t[a.posicion[0]][a.posicion[1]] = function(){
      if(a.jugador == null) return vacio;      
      if(a.jugador == jugador.O ) return oponente;      
      if(a.jugador == jugador.X) return maquina;      
    }()
  });
  return t;
}

function trasladarOcupar(pos){

  let indexCasilla = casillas.findIndex(a=>a.posicion[0] == pos[0] && a.posicion[1]==pos[1])
  
  ocupar(casillas[indexCasilla],jugador.X);
}