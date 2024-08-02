document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    scrollNav();
    navCars();
    detectarScroll();
    footerNav();
    noDownload();
    fadeScroll();
    dolarEuro();
}


// REVISAR
function detectarScroll() {
    const barra = document.querySelector(".navegacion-vehiculos");
    const nav_Vehiculos = document.querySelector('.contenido-vehiculos');
    const body = document.querySelector('body');
    
    window.addEventListener('scroll', () => {
        if (nav_Vehiculos.getBoundingClientRect().top < 0) {
            console.log("Se acaba de entrar en VEHICULOS");
            barra.classList.add('fijo');
            barra.classList.remove('navbar-hidden'); // Asegúrate de quitar la clase que oculta la barra si es necesario
            body.classList.add('body-scroll');
        } else {
            console.log('Fuera de vehiculos');
            barra.classList.remove('fijo');
            barra.classList.add('navbar-hidden'); // Añade la clase para ocultar la barra si es necesario
            body.classList.remove('body-scroll');
        }
    
        // Aquí puedes añadir lo que desees realizar cuando se detecte el scroll
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            const seccionScroll = e.target.getAttribute('href'); // Obtener el valor del href

            if (seccionScroll.startsWith('#')) { //Verificamos que al principio del enlace, tenga un # para que este se comporte de cierta manera
                e.preventDefault(); // Previene el comportamiento por defecto del enlace

                const seccion = document.querySelector(seccionScroll); // Accedemos al valor del enlace
                seccion.scrollIntoView({ behavior: "smooth" });
            } 
            // Si el href no comienza con '#', significa que es un enlace externo o a otra página y no se previene su comportamiento por defecto
        });
    });
}
function footerNav(){
    const enlaces = document.querySelectorAll('.navegacion-footer a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            const seccionScroll = e.target.getAttribute('href'); // Obtener el valor del href

            if (seccionScroll.startsWith('#')) { //Verificamos que al principio del enlace, tenga un # para que este se comporte de cierta manera
                e.preventDefault(); // Previene el comportamiento por defecto del enlace

                const seccion = document.querySelector(seccionScroll); // Accedemos al valor del enlace
                seccion.scrollIntoView({ behavior: "smooth" });
            } 
            // Si el href no comienza con '#', significa que es un enlace externo o a otra página y no se previene su comportamiento por defecto
        });
    });
}

function navCars(){
    const vehiculos = document.querySelectorAll('.navegacion-vehiculos a');
    vehiculos.forEach(vehiculo => {
        vehiculo.addEventListener('click', function(e){
            e.preventDefault();

            const seleccionarVehiculo = e.target.getAttribute('href');           
            const seleccionar = document.querySelector(seleccionarVehiculo); // Accedemos al valor del enlace
            seleccionar.scrollIntoView({ behavior: "smooth" });

        })

    })
      

}


//Iteramos en las imagenes y evitamos su comportamiento por defecto
function noDownload(){
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', function (e) {
          e.preventDefault();
        });
      });
}

function fadeScroll(){
    // INDEX
    ScrollReveal().reveal('.titulo-nav', { distance: '6rem' ,delay: 300, reset:false, origin:'left', mobile:false});
    ScrollReveal().reveal('.navegacion-principal', { distance: '4rem', delay: 600, reset:false, origin:'bottom', mobile:false, desktop:true, tablet: true});
    ScrollReveal().reveal('.contenido-video', {distance:'3rem', delay: 900, reset:false, origin:'top', mobile:false, desktop:true, tablet: true });

    ScrollReveal().reveal('.titulo-nosotros', {distance:'3rem', delay: 300, reset:false, origin:'top', mobile:false, desktop:true, tablet: true});
    ScrollReveal().reveal('.contenido-nosotros', {distance:'3rem', delay: 500, reset:false, origin:'top', mobile:false, desktop:true, tablet: true});

    ScrollReveal().reveal('.navegacion-vehiculos', {distance:'3rem', delay: 200, reset:false, origin:'top', mobile:false, desktop:true, tablet: true});
    ScrollReveal().reveal('.lista-vehiculos', {distance:'3rem', delay: 200, reset:false, origin:'top', mobile:false, desktop:true, tablet: true});

    // CONTACTO
    ScrollReveal().reveal('.titulo-contacto', { distance: '6rem' ,delay: 200, reset:false, origin:'bottom', mobile:false});
    ScrollReveal().reveal('form', { distance: '4rem', delay: 300, reset:false, origin:'left', mobile:false, desktop:true, tablet: true});
    ScrollReveal().reveal('.imagen-contacto2', {distance:'3rem', delay: 900, reset:false, origin:'top', mobile:false, desktop:true, tablet: true });
   
    // CABALLERIA
    ScrollReveal().reveal('.iconos-caballerias', {distance:'3rem', delay: 900, reset:false, origin:'top', mobile:false, desktop:true, tablet: true });
    ScrollReveal().reveal('.titulo-caballeria', {distance:'3rem', delay: 700, reset:false, origin:'top', mobile:false, desktop:true, tablet: true });
    ScrollReveal().reveal('.texto-caballeria', {distance:'3rem', delay: 700, reset:false, origin:'left', mobile:false, desktop:true, tablet: true });
    ScrollReveal().reveal('.imagen-caballeria', {distance:'3rem', delay: 800, reset:false, origin:'bottom', mobile:false, desktop:true, tablet: true });


    // Nav footer
    ScrollReveal().reveal('.navegacion-footer', { distance: '4rem', delay: 400, reset:false, origin:'bottom', mobile:false, desktop:true, tablet: true});
}

function dolarEuro (){
 const texto = document.getElementById('texto');

      texto.addEventListener('click', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace
      });
      texto.addEventListener('mouseover', function() {
        texto.textContent = "1 USD || 0,92 EUR";
      });
      texto.addEventListener('mouseout', function() {
        texto.textContent = "Precio Dolar/Euro";
      });
}