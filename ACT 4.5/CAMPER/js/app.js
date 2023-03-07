// Referencia a las etiquetas HTML
const productosTag = document.querySelector('#productos');
const orderFilterTag = document.querySelector('#orderFilter');
let shoesJSON = [];
let shoesFavorites = [];

// Técnica aymnc / await asociada en la carga de solvente del objeto de Windows.
window.onload = async () => {
   const respuesta = await fetch('./data/products.json');
   shoesJSON = await respuesta.json();
   // Para pintar el json 
   printShoes(shoesJSON);
   handleFavorites();
   loadFavorites();

   // CLICK DE ORDENAR (Clasificar por nombre o por precio)
   orderFilterTag.addEventListener("change", function () {
      sortShoes();
      loadFavorites();
      handleFavorites();
   });

};

// PLANTILLA HTML PARA IMPRIMIR EL JSON
const printShoes = (shoes) => {
   productosTag.innerHTML = "";
   shoes.forEach(e => {
      let template = `    
      <article class="card">
            <img src="./img/${e.image}" alt="" />
            <p class="name">${e.name}</p>
            <p>Precio ${e.price}€</p>
            <p>${e.colors}</p>
            <div class="favorite">
               <i class="fas fa-heart" data-id="${e.id}"></i>
            </div>
      </article>`;
      productosTag.innerHTML += template;
   });
};

// Función para cambiar la vista de 4 a 6 elementos 
const changeView = (number) => {
   if (number === 4) {
      productosTag.classList.replace("grid-6", "grid-4");
   } else if (number === 6) {
      productosTag.classList.replace("grid-4", "grid-6");
   }
};


// FUNCIÓN DE ORDENAR (Clasificar por nombre o por precio)
const sortShoes = () => {
   let index = orderFilterTag.selectedIndex;
   let option = orderFilterTag.options[index];
   let nuevaLista = [];
   if (option.value === 'P') {
      nuevaLista = shoesJSON.sort((a, b) => a.price - b.price);
   } else if (option.value === 'N') {
      nuevaLista = shoesJSON.sort((a, b) => {
         if (a.name > b.name) return 1;
         else if (a.name < b.name) return -1;
         else return 0;
      });
   } else {
      return;
   }
   printShoes(nuevaLista);
};

// LOS ICONOS DE FAVORITOS (EL CORAZÓN ROJO)
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
      shoesFavorites.push({ "id": idFavorite });
   } else {
      // Eliminar favorito
      shoesFavorites = shoesFavorites.filter(e => e.id != idFavorite);
   }
   // Guardar los favoritos  
   localStorage.setItem("shoesFavorites", JSON.stringify(shoesFavorites));
};

// CARGAR LOS FAVORITOS DE localStorage
const loadFavorites = () => {
   if (localStorage.getItem("shoesFavorites")) {
      shoesFavorites = JSON.parse(localStorage.getItem("shoesFavorites"));
   } else {
      shoesFavorites = [];
   }

   shoesFavorites.forEach(fav => {
      document.querySelector(`.fa-heart[data-id="${fav.id}"]`).classList.add("on");
   });
};