// draw at the scroll

const heigth = document.body.scrollHeight - window.innerHeight;
const background = document.getElementById("fondo");

window.onscroll = () => {
    const anchoFondo = (window.pageYOffset / heigth) * 2000;
    if (anchoFondo <= 100) {
        background.style.width = anchoFondo + "%"; 
    }
}

//code for script of slider

const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider-section");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.querySelector("#slider-btn-left");
const btnRigth= document.querySelector("#slider-btn-rigth");

slider.insertAdjacentElement ('afterbegin', sliderSectionLast);  

function sliderPower () {
    let sliderSectionFirst = document.querySelectorAll(".slider-section")[0]; 
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.6s";
    setTimeout(function() {
        slider.style.transition = "none"; 
        slider.insertAdjacentElement ('beforeend', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 600);
}

function sliderPrev () {
    let sliderSectionFirst = document.querySelectorAll(".slider-section"); 
    let sliderSectionLast = sliderSection[sliderSection.length - 1];
    slider.style.marginLeft = "0%";
    slider.style.transition = "all 0.6s";
    setTimeout(function() {
        slider.style.transition = "none"; 
        slider.insertAdjacentElement ('afterbegin', sliderSectionLast); 
        slider.style.marginLeft = "-100%";
    }, 600);
}


btnRigth.addEventListener('click', function() {
    sliderPower();
});

btnLeft.addEventListener('click', function() {
    sliderPrev();
});

setInterval (function () {
    sliderPower();
}, 3000)

// script for nav-search-dianmyc-category

const grid = new Muuri('.grid', {
    layout : {
        // fillGaps : true,
        // horizontal : true,
        // alignRight: true,
        // alignBottom : true,
        rounding: false
    }
});

window.addEventListener ( 'load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // add the listener for code to categiry filter
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activado'))
            evento.target.classList.add('activado');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
            console.log(categoria);
        });
    });


    // add the listener for the search bar 

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter( (item)  => item.getElement().dataset.etiquetas.includes(busqueda) );
        console.log(busqueda);
    });

    // listener for the images 

    const overlays = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {

        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const description = elemento.parentNode.parentNode.dataset.description;

            overlays.classList.add('activo')
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .description').innerHTML = description;
        })
    });

    // eventlistener for button close

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlays.classList.remove('activo');
    })

    // event listener of overlay 
    overlays.addEventListener("click", (evento) => {
        evento.target.id === 'overlay' ? overlays.classList.remove('activo') : '';
    })
});


