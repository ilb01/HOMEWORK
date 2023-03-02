const contenedor = document.getElementById('container-canciones');
const orderFilterTag = document.querySelector('#orderFilter');
let songJSON = [];
let songFavorites = [];

window.onload = async () => {
    const respuesta = await fetch('./data/cancion.json');
    songJSON = await respuesta.json();
    // Para pintar el json 
    rellenaTablaCanciones(songJSON);
    handleFavorites();
    loadFavorites();

    // CLICK DE ORDENAR (Clasificar por nombre o por precio)
    orderFilterTag.addEventListener("change", function () {
        sortSong();
        loadFavorites();
        handleFavorites();
    });

};

const rellenaTablaCanciones = (song) => {
    contenedor.innerHTML = "";
    song.forEach(e => {
        let template =
            `
            <tr>
                <th scope="row" class="favorite"><i class="fas fa-heart" data-id="${e.id}"></i></th>
                <td>${e.titulo}</td>
                <td>${e.artista}</td>
                <td>${e.album}</td>
                <td>${e.fecha}</td>
                <td>${e.duración} </td>
            </tr>
        `;
        contenedor.innerHTML += template;
    });
};

// filtrar por nombre
const sortSong = () => {
    let index = orderFilterTag.selectedIndex;
    let option = orderFilterTag.options[index];
    let nuevaLista = [];
    if (option.value === 'N') {
        nuevaLista = songJSON.sort((a, b) => {
            if (a.titulo > b.titulo) return 1;
            else if (a.titulo < b.titulo) return -1;
            else return 0;
        });
    }
    else if (option.value === 'O') {
        nuevaLista = songJSON.sort((c, d) => {
            if (c.artista > d.artista) return 1;
            else if (c.artista < d.artista) return -1;
            else return 0;
        });
    } else {
        return;
    }
    rellenaTablaCanciones(nuevaLista);
};

const handleFavorites = () => {
    const favoritesList = document.querySelectorAll(".fa-heart");
    favoritesList.forEach(fav => {
        fav.addEventListener("click", function () {
            // This es el icono HTML en el cual el usuario acaba de pulsar
            this.classList.toggle("on");
            saveFavorites(this);
        });
    });
};

// FUNCION DE GUARDAR LOS FAVORITOS
const saveFavorites = (favObj) => {
    let idFavorite = favObj.dataset.id;
    if (favObj.classList.contains("on")) {
        // Agregar favorito
        songFavorites.push({ "id": idFavorite });
    } else {
        // Eliminar favorito
        songFavorites = songFavorites.filter(e => e.id != idFavorite);
    }
    // Guardar los favoritos  
    localStorage.setItem("songFavorites", JSON.stringify(songFavorites));
};

// CARGAR LOS FAVORITOS DE localStorage
const loadFavorites = () => {
    if (localStorage.getItem("songFavorites")) {
        songFavorites = JSON.parse(localStorage.getItem("songFavorites"));
    } else {
        songFavorites = [];
    }

    songFavorites.forEach(fav => {
        document.querySelector(`.fa-heart[data-id="${fav.id}"]`).classList.add("on");
    });
};
