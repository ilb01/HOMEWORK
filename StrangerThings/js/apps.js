const gridSimilars = document.querySelector('.grid-similares');
let seasonsJSON = [];
// PARA HACER EL ACTIVE 
let currentSeason = 1;

const getSeasons = () => {
    fetch("./data/seasons-things.json")
        .then(res => res.json())
        .then(data => {
            // para coger el json de a partir season 
            seasonsJSON = data.seasons;
            renderSeasons(seasonsJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

const renderSeasons = (list) => { 
    // PARA SACAR
    const currentSeasonStorage = localStorage.getItem("currentSeason");
    if(currentSeasonStorage) currentSeason=parseInt(currentSeasonStorage, 10); // parseInt --> para pasar a cadena de texto

    const seasonsContainer = document.querySelector('#nav-temporada');
    seasonsContainer.innerHTML="";// para vaciar 
    for (let i = 0; i < seasonsJSON.length; i++) {
        let numberSeason = i + 1;
        seasonsContainer.innerHTML+=`
        <a href="#episodes-container" 
        id="season-${numberSeason}" 
        onclick="showEpisodes(${numberSeason})"
        class="${currentSeason === numberSeason?"active":""}">
        Temporada ${numberSeason}
        </a>
        `;
    }
    showEpisodes(currentSeason);
}

const showEpisodes = (numberSeason) => { 
        currentSeason=numberSeason;
        // localStorage hace que cuando refrescamos la página se guardará
        localStorage.setItem("currentSeason", currentSeason);

        // PARA TENER ACTIVA O NO
        document.querySelector('#nav-temporada .active').classList.remove("active");
        document.querySelector(`#season-${currentSeason}`).classList.add("active");
        const episodesContainer = document.querySelector('.episodes');
        episodesContainer.innerHTML="";
        // Coge la primera array que cumpla esa condición
        const episodes = seasonsJSON.find(season=>season.number===currentSeason).episodes;
        episodes.forEach(e => {
            episodesContainer.innerHTML+=`
                <article class="item-episode">
                    <div class="number">${e.number}</div>
                    <div class="play-episode">
                        <img src="./img/${e.image}" alt="">
                        ${currentSeason === numberSeason?"":""}
                        <progress value="${e.progress}" max="100"> ${e.progress}% </progress>
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
            `;
        })
        episodesContainer.innerHTML="<h2>Episodios</h2>" + episodesContainer.innerHTML;
}

// nfn la primera opción
// PARA RECOGER EL JSON PARA PONER EN JAVASCRIPT
const getSeries = () => {
    fetch("./data/series.json")
        .then(res => res.json())
        .then(data => {
            renderListSimiliars(data)
        })
        .catch(error => {
            console.log(error);
        })
}
const renderListSimiliars = (series) => {
    gridSimilars.innerHTML = "";
    series.forEach(serie => {
        gridSimilars.innerHTML += renderCard(serie);
    });
}

const renderCard = (serie) => {
    // CONDICIÓN JSON
    let time = "Temporadas";
    if (serie.miniserie) {
        {
            time = "Miniserie";
        }
    }
    else if (serie.episodes) {
        time = serie.episodes + " episodios";
    }
    else {
        time = serie.season + " temporadas";
    }
    // COINCIDENCIA
    let mathHTML = "";
    if (serie.match > 70) {
        mathHTML = `<div class="coincidencia">${serie.match}% de coincidencia</div>`
    }
    // ESTRELLAS
    let starsHTML = "";
    if (serie.stars) {
        for (let i = 0; i < serie.stars; i++) {
            // star
            starsHTML += `<div class="star"></div>`;
        }
        // SON 5 ESTRELLAS POR LO TANTO ACABA COMO 5
        for (let i = serie.stars; i < 5; i++) {
            // star-off
            starsHTML += `<div class="star-off"></div>`;
        }
        starsHTML = `<div class="score">${starsHTML}</div`
    }
    // ${parámetro.nombrejson} para imprimir json en html
    return `
        <article class="card">
            <div class="season">${time}</div>
            <img src="./img/${serie.cover}" alt="">
            <div class="container">
            ${mathHTML}
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
}

function init() {
    getSeries();
    getSeasons();
}
init();