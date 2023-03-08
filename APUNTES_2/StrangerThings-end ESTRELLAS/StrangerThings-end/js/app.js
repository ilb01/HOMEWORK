
const gridSimilar = document.querySelector('.grid-similares');
let seasonsJSCN = [];
let currentSeason = 1;

const getSeasons = () => {
    fetch("./data/seasons-things.json")
        .then(res => res.json())
        .then(data => {
            seasonsJSCN = data.seasons;
            renderSeasons(seasonsJSCN);
        })
        .catch(error => {
            console.log(error); //para saber si hay ulgún error. Esto es un control de errores.
        }
        );
}

const renderSeasons = (list) => {
    const currentSeasonStorage = localStorage.getItem("currentSeason");
    if (currentSeasonStorage) currentSeason = parseInt(currentSeasonStorage, 10); // siempre se guarda en una cadena de texto en una storage
    const seasonContainer = document.querySelector('#nav-temporada');
    seasonContainer.innerHTML = '';
    for (let i = 0; i < seasonsJSCN.length; i++) {
        let numberSeason = i + 1
        seasonContainer.innerHTML +=
            `
        <a href="#" 
        id="season-${numberSeason}"
        onclick="showEpisodes(${numberSeason})"
        class="${currentSeason === numberSeason ? "active" : ""}">
        Temporada ${numberSeason}</a>
        
        `;

    }

    showEpisodes(currentSeason);
}

const showEpisodes = (numberSeason) => {
    currentSeason = numberSeason;
    localStorage.setItem("currentSeason", currentSeason);
    document.querySelector('#nav-temporada .active').classList.remove("active");
    document.querySelector(`#season-${currentSeason}`).classList.add("active");

    const episodesContainer = document.querySelector('.episodes')
    episodesContainer.innerHTML = "";

    const episodes = seasonsJSCN.find(season => season.number === currentSeason).episodes;
    episodes.forEach(e => {
        episodesContainer.innerHTML +=
            `
        <article class="item-episode">
                    <div class="number">${e.number}</div>
                    <div class="play-episode">
                        <img src="img/${e.image}" alt="">
                        <div class="play-episode-icon"></div>
                    </div>
                    <div class="desc">
                        <div class="container-title">
                            <h3>${e.title}</h3>
                            <div class="duration">${e.duration} min</div>
                        </div>
                        <p>${e.description}</p>
                    </div>
                </article>

        `
    });
}



// PRIMERA PARTE HACER LAS TARJETAS DE LAS SERIES SIMILARES

const getSeries = () => {   //FETCH DE LAS SERIES SIMILARES
    fetch("./data/series.json")
        .then(res => res.json())
        .then(data => {
            renderListSimilars(data); // es importante poner aqui el renderList para que funciona CONST LINEA 90
        })
        .catch(error => {
            console.log(error); //para saber si hay ulgún error. Esto es un control de errores.
        }
        );
}


const renderListSimilars = (series) => {  // consts para renderizar la serie . En este caso renderListSimilars tiene la informacion de la data
    gridSimilar.innerHTML = "";
    series.forEach(serie => {
        gridSimilar.innerHTML += renderCard(serie) // para que la const renderCard de la linea 98 coja la data.
    })
}

// PARA EMPEZAR A DIBUJAR LAS CARDS DESDE EL JSON
const renderCard = (serie) => { // para que coja la data del fetch lo hacemos en la linea 93

    let time = null;
    if (serie.miniserie) {
        time = "Miniserie";
    } else if (serie.episodes) {
        time = serie.episodes + " episodios";
    } else {
        time = serie.seasons + " temporadas"
    }

    let matchHTML = "";
    if (serie.match > 70) {
        let matchHTML = `<div class="coincidencia">${serie.match}% de coincidencia</div>`;
    }


    // IMPORTANTE NO TODAS LA SERIES TIENEN ESTRELLAS  POR ESO HAY QUE HACERLO POR SEPARADO 

    let starsHTML = "";
    if (serie.stars) { //hacemos referencia a las series que en el .json tengan stars

        for (let i = 0; i < serie.stars; i++) {
            // pintamos estrellas
            starsHTML += `<div class="star"></div>`;
            console.log(starsHTML)
        }
        for (let i = serie.stars; i < 5; i++) {
            // estrellas sin pintaar
            starsHTML += `<div class="star-off"></div>`;
            console.log(starsHTML)
        }

        starsHTML = `<div class="score">${starsHTML}</div>`

    }

    return `
    <article class="card">
    <div class="season">${time}</div>
    <img src="./img/${serie.cover}" alt="">
    <div class="container">
        ${matchHTML}
        <div class="info-card-container">
            <div>
                <span class="pegi age-${serie.pegi}">${serie.pegi}+</span>
                <span class="year">${serie.release}</span>
            </div>
            <div>
                <span class="material-icons btn-icon">add</span>
            </div>
        </div>
            ${starsHTML}
        <p>${serie.description}</p>
    </div>
</article>
    `
} // aqui termina de dibukjar las cards

function init(params) {
    getSeries() // poner aqui const de getSeries para que funciones es la linea 77
    getSeasons()
}
init();