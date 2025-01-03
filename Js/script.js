document.write('<script src="./Js/menu.js"></script>')

// Variables
let abrirMen = document.querySelector('.mensajeBienvenida');
let btnCerrarC = document.getElementById('cerrarCon');
let botonContactame = document.getElementById('botContactame')
let contentLogo = document.querySelector('#miLogo')

//event listeners del window cargando
window.onload = load;
//Funciones

contentLogo.innerHTML = `Isidro<span>Marroquin</span>`;

// abrir badge de bienvenida
botonContactame.addEventListener('click', abrirContacto )

function abrirContacto() {
    abrirMen.style.top = '0px';
}
//funcion mostrar mensaje de contacto cuando la pagina cargue
function load(){
    if(window.onload = true) {
       setTimeout(function() {
       },30000)
    }
};

//funcion cerrar mensaje contacto
btnCerrarC.addEventListener('click', cerrarMen)

function cerrarMen() {
    abrirMen.style.top = '-1000px'
}

//cambiar color de la pagina
const botonColor = document.querySelector('.camb-color');
const body = document.querySelector('body');
const icoCam = document.getElementById('icoCol')
var estado = 'negro';

botonColor.addEventListener('click', () => { 
    switch(estado) {
        case 'blanco':
            body.className = 'dark';
            icoCam.name = 'sunny';
            icoCam.style.transition = 'all .8s';
            estado = 'negro';
            break;
        case 'negro':
            estado = 'blanco';
            icoCam.name = 'moon';
            icoCam.style.transition = 'all .8s';
            body.style.transition = 'all .8s';
            body.className = 'ligth';
            break;
    }
});

// validar formulario
const nombre = document.querySelector('.nombre').value
const correo = document.querySelector('.email').value
const botonValidar = document.querySelector('#btnValidar')
const alerta = document.getElementById('alerta')

var mensajeHTML = `
    <div class="alert alert-danger" role="alert">
        Llena todos los campos.
    </div>
`;

// funcion validar formulario
botonValidar.addEventListener('click', () => {

    if(nombre === '' || correo === ''){
        alerta.innerHTML = mensajeHTML;
    }else {
        alerta.innerHTML = '';
    }
})

var url = 'https://alex-marroquin.netlify.app/JS/generator.js';
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var options = {
  "host":"https://alex-marroquin.netlify.app",
  "enabled":true,
  "chatButtonSetting":{
      "backgroundColor":"#4fce5d",
      "ctaText":"",
      "icon":"whatsapp",
      "position":"left",
  },
  "brandSetting":{
      "backgroundColor":"#085b53",
      "brandImg":"https://alex-marroquin.netlify.app/images/SARARobotics.png",
      "brandName":"Isidro Marroquin",
      "brandSubTitle":"Soporte Técnico",
      "ctaText":"Iniciar chat",
      "phoneNumber":"50372064733",
      "welcomeText":"¡Hola! En que puedo ayudarte? 👀"
  }
};
    s.onload = function() {
        CreateWhatsappChatWidget(options);
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
