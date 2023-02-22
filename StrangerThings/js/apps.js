const gridSimilars = document.querySelector('.grid-similares');

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
}
init();