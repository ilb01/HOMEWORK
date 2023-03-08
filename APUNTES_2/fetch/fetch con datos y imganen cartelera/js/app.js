const imagen = document.getElementById('imagen');
const dato = document.getElementById('dato')

function pelicula() {
    fetch("./data/pelicula.json")
        .then(res => res.json())
        .then(data => {
            pelucas = data
            añadirPelicula()
            cuerpo()
        })
}


function añadirPelicula() {
    imagen.innerHTML = '';
    for (let pelicula of pelucas) {
        console.log(pelicula.img)
        imagen.innerHTML += `
        
        <img src="./img/${pelicula.img}" alt="">
        
        `
    }

}

function cuerpo() {
    dato.innerHTML = '';
    for (let pel of pelucas) {
        dato.innerHTML +=

            `
        <dl>
        <dt>Nombre : </dt>
        <dd>${pel.titulo}</dd>
        <dt>Sinopsis :</dt>
        <dd>${pel.sinopsi}</dd>
        <dt>Fecha de estreno : </dt>
        <dd>${pel.fecha}</dd>
        <dt>Edad recomendada : </dt>
        <dd>${pel.edad} años</dd>
        <dt>Genero : </dt>
        <dd>${pel.genero}</dd>
        <dt>Sesiones : </dt>
        <dd>${pel.sesiones}</dd>
        </dl> 
        `
    }
}



function init() {
    pelicula()
}
init()