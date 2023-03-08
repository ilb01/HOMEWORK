const gridTag = document.querySelector('#grid-characters'); // hace referencia al section donde se pone todas las tarjetas
const viewTag = document.querySelector('#change-view');
const btnFiltrarTag = document.querySelector('#btnFiltrar');
const textSearchTag = document.querySelector('#textSearch'); // el input para buscar por nombre 
const orderFilterTag = document.querySelector('#orderFilter');  // este es el select para ordenar por nombre y poder
const viewModeTag = document.querySelector('#view-mode');
const windowDialogTag = document.querySelector('#window-dialog');
const btnCloseDialogTag = document.querySelector('#btnCloseDialog');
const modalBackgroundTag = document.querySelector('.modal');

let charactersJSON = []; // necesario para que funciones el filtrado

window.onload = async () => {
   const respuesta = await fetch('./data/characters.json'); // fetch para coger la inforacion de un json
   charactersJSON = await respuesta.json();
   pintarPersonajes(charactersJSON);

   btnFiltrarTag.addEventListener("click", filtrarPersonajes); // boton para que filtre los personajes  filtrarPersonajes es la const de la linea 51

   orderFilterTag.addEventListener("change", ordenarPersonajes); // el evento que activa al seleccionar una de las opciones  ordenarPersonajes es la const de la linea 28
   viewModeTag.addEventListener("click", changeViewMode); // tema claro oscuro no se mira
   btnCloseDialogTag.addEventListener("click", () => {
      windowDialogTag.close();
      modalBackgroundTag.style.display = "none";
   });
};


// este el const para ordenar en el select
const ordenarPersonajes = () => {
   let index = orderFilterTag.selectedIndex;
   let option = orderFilterTag.options[index];
   let nuevaLista = [];


   // para ordenar por numeros ordenar de mayor a menos si queremos de menor a mayor pondremos nuevaLista = charactersJSON.sort((a, b) => a.power - b.power);
   if (option.value === 'P') {
      nuevaLista = charactersJSON.sort((a, b) => b.power - a.power);

      // para ordenar por cadena de texto en orden alfabetico
   } else if (option.value === 'N') {
      nuevaLista = charactersJSON.sort((a, b) => {
         if (a.name > b.name) return 1;
         else if (a.name < b.name) return -1;
         else return 0;
      });


      // mi prueba para ordenar alfabeticamente por casa de A a Z si queremos ordenar de Z a A  
      // if (a.planet < b.planet) return 1; cambiamos > por <
      // else if (a.planet > b.planet) return -1  cambiamos < por >

   } else if (option.value === "C") {
      nuevaLista = charactersJSON.sort((a, b) => {
         if (a.planet > b.planet) return 1;
         else if (a.planet < b.planet) return -1;
         else return 0;
      })


   } else {
      return;
   }

   pintarPersonajes(nuevaLista);
};



// Para filtrar por nombres

const filtrarPersonajes = () => {
   if (textSearchTag.value === "") {
      pintarPersonajes(charactersJSON);
      return;
   }
   const nuevaLista = charactersJSON.filter(e => {
      return (e.name.toUpperCase().includes(textSearchTag.value.toUpperCase())) ||  /* en este caso filtra si el nombre contiene una de las letras */
         (e.planet.toUpperCase() === textSearchTag.value.toUpperCase()) ||  /* en este caso filtra por el nombre de la casa al completo */
         (e.power == textSearchTag.value); // prueba mia para buscar por poder al ser en esta caso un numero y no texto pongo == en lugar de ===
   });
   pintarPersonajes(nuevaLista);
};

// fin filtrado personjes




// con esto cambiamos las cuadriculas 

const changeView = (number) => {
   if (number == 6) {
      gridTag.classList.replace("grid-4", "grid-6"); // esto sale en el css que es un displey grid
   } else {
      gridTag.classList.replace("grid-6", "grid-4");// esto sale en el css que es un displey grid
   }
};



// para pintar las tarjetas de los personajes

const pintarPersonajes = (characters) => {
   gridTag.innerHTML = "";
   characters.forEach(e => {
      let template = `    
            <article>
                <img src="./img/${e.image}" alt="">
                <h3>Name:${e.name}</h3>
                <h4>Planet:${e.planet}</h4>
                <h4>Power:${e.power}</h4>
                <button onclick="handleDialog(${e.id})">Ver detalle</button>
            </article>`;
      gridTag.innerHTML += template;

   });







   // Tema oscuro y claro no sale en el examen


   if (viewModeTag.classList.contains("fa-moon")) {
      const articles = document.querySelectorAll('article');
      articles.forEach(e => e.classList.add("dark"));
   }

};

const changeViewMode = () => {
   if (viewModeTag.classList.contains("fa-sun"))
      viewModeTag.classList.replace("fa-sun", "fa-moon");
   else
      viewModeTag.classList.replace("fa-moon", "fa-sun");

   const elements = document.querySelectorAll('body, .filter, article');
   elements.forEach(e => {
      e.classList.toggle("dark");
   });
};









// Esto es el detalle al pulsar sober el boton detalle NO SALE EN EL EXAMEN

const handleDialog = (id) => {

   const info = document.querySelector('#info-character');
   const character = charactersJSON.find(e => e.id === id);

   info.innerHTML = `
      <div class="card-image">
         <img src="./img/${character.image}">
         <h4>${character.name}</h4>
      </div>
      <div class="card-info">
         <p>Power:${character.power}</p>
        
         <h3>Description</h3>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero reiciendis ipsum illo ut ab, consectetur consequuntur non quis, officiis ullam dolorum ipsam cupiditate aperiam corporis repudiandae accusamus? Quod deserunt itaque necessitatibus doloremque? Accusantium amet ipsam cupiditate eos placeat numquam repellendus ducimus enim? Reprehenderit tempore ipsa, mollitia consectetur debitis laboriosam ullam impedit minima odit sit, ducimus, maxime voluptas. Nulla quos aspernatur, esse, amet impedit rem quia quod delectus natus error tempora, porro fugit accusamus! Ad adipisci minima molestias, hic similique dignissimos iste quae maxime distinctio dicta ab fugit eos. Beatae voluptatibus amet, itaque laborum culpa illo facere fugit molestias ipsa tempora?</p>
      </div>
   `;
   windowDialogTag.show();
   const modal = document.querySelector('.modal');
   modalBackgroundTag.style.display = "block";
};