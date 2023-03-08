// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const btnBuscador = document.querySelector("#submit-buscador");
const orderFilterTag = document.querySelector('#orderFilter');
let articulosCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarEventListeners();
  cargarCursos();
});

/**
 * Configurar los eventos de usuario
 */
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Muestra los cursos del carrito de Local Storage cuando se carga la página en el navegador
  // Si la primera condición falla, inicializa la variable a []
  articulosCarrito = JSON.parse(localStorage.getItem("carritoCursos")) || [];
  generarCarritoHTML();

  // Vaciar el carrito cuando se pulsa en el icono x del carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // reseteamos el arreglo
    contenedorCarrito.innerHTML = ""; // Eliminamos todo el HTML
    localStorage.removeItem("carritoCursos");
    document.querySelector("#num-cursos").innerHTML = "0"; // Inicializar cantidad cursos
  });

  btnBuscador.addEventListener("click", searchCursos);
}


/**
 * Lee los cursos del json y pinta el HTML central correspondiente
 */
function cargarCursos(pFilterTitle) {
  fetch("./data/cursos.json")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on api server!");
      }
    })
    .then((listaCursos) => {
      console.debug(listaCursos);
      if (pFilterTitle && pFilterTitle != "") {
        // Con expresiones regulares
        let re = new RegExp('\w' + pFilterTitle + '\w');
        item => re.test(item.title);

        listaCursos = listaCursos.filter((curso) =>
          curso.title.toLowerCase().includes(pFilterTitle.toLowerCase())
        );
      }
      pintarCursos(listaCursos);
    })
    .catch((error) => {
      console.error(error);
    });
}

function pintarCursos(listaCursos) {
  let content = document.querySelector("#list-content");
  content.innerHTML = "";

  // Pinta todas las tarjetas con la información de los cursos
  listaCursos.forEach((curso) => {
    let starsHTML = "";
    if (curso.stars) {
      for (let i = 0; i < curso.stars; i++) {
        // star
        starsHTML += `<div class="star"></div>`;
      }
      // SON 5 ESTRELLAS POR LO TANTO ACABA COMO 5
      for (let i = curso.stars; i < 5; i++) {
        // star-off
        starsHTML += `<div class="star-off"></div>`;
      }
      starsHTML = `<div class="score">${starsHTML}</div`
    }
    let htmlCurso = `
        <div class="card">
          <img src="img/curso${curso.id}.jpg" width="200px" height="150px" class="imagen-curso">
          <div class="info-card">
              <h4>${curso.title}</h4>
              <p class="profesor">${curso.teacher}</p>
              <p>${starsHTML} </p>
              <p class="precio">${curso.price}€ <span class="u-pull-right ">${curso.priceOffer}€</span></p>
              <a href="#" class="button agregar-carrito"
                  data-id="${curso.id}">Agregar Al Carrito</a>
          </div>
        </div
    `;
    content.innerHTML += htmlCurso;
  });
}

// FILTRAR POR NOMBRE
const sortCursos = () => {
  let index = orderFilterTag.selectedIndex;
  let option = orderFilterTag.options[index];
  let nuevaLista = [];
  if (option.value === 'N') {
    nuevaLista = listaCursos.sort((a, b) => {
      if (a.title > b.title) return 1;
      else if (a.title < b.title) return -1;
      else return 0;
    });
  }
  else {
    return;
  }
  pintarCursos(nuevaLista);
};

/**
 * Lee el contenido del HTML al que le dimos click y lo añade al carrito
 * @param {*} e : evento de usuario
 */
function agregarCurso(e) {
  // Previene de queno se envie el formulario al pulsar el botón de "Agregar carrito"
  e.preventDefault();
  let curso; // Contendrá la información html del curso en concerto a agregar

  // Comprueba que existen tarjetas (card) de cursos en la parte central
  if (e.target.classList.contains("agregar-carrito")) {
    curso = e.target.parentElement.parentElement; // el curso (clase "card") es el abuelo de botón
  } else {
    console.error("Error leyedo datos, no hay cursos");
    return false;
  }
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    profesor: curso.querySelector(".profesor").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // Si ya existe el curso en el carrito, sólo actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son los duplicados
      }
    });
    console.log("agregarCurso -> cursos", cursos);
    // La variable "cursos" contiene un array de cursos actualizados
    // Pasamos los cursos al nuevo carrito
    articulosCarrito = cursos; //articulosCarrito = [...cursos];
  } else {
    // Agrega el nuevo curso al array de carrito
    articulosCarrito.push(infoCurso); //articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  generarCarritoHTML();
  mostrarAlert();
}

/**
 * Elimina un curso del carrito
 */
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    generarCarritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}

// Muestra el Carrito de compras en el HTML
function generarCarritoHTML() {
  contenedorCarrito.innerHTML = "";

  let cantidadTotal = 0;

  // Recorre el carrito y genera el HTML para cada item
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, profesor, precio, cantidad, id } = curso; // Usamos destructuring
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${profesor}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
    cantidadTotal += cantidad;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

  // Pintar fila total
  if (cantidadTotal > 0) {
    let precioTotal = 100 * cantidadTotal;
    const row = document.createElement("tr");
    /*template*/
    row.innerHTML = `
        <td colspan="3">Total</td>
        <td>${precioTotal}€</td>
        <td>${cantidadTotal}</td>
        <td></td>
    `;
    contenedorCarrito.appendChild(row);
  }

  // Agregar el carrito de compras al storage
  localStorage.setItem("carritoCursos", JSON.stringify(articulosCarrito));

  calcularNumeroCursos();
}

/**
 * Busca por nombre
 */
function searchCursos(e) {
  e.preventDefault();

  const title = document.getElementById("buscador").value;
  cargarCursos(title);
}

/**
 * Calcula el total de cursos que existen en el carrito
 */
function calcularNumeroCursos() {
  let cantidadTotal = 0;
  articulosCarrito.forEach((item) => (cantidadTotal += item.cantidad));

  let numCursos = document.querySelector("#num-cursos");
  numCursos.innerHTML = cantidadTotal;
}

/**
 * Muestra el mensaje de confirmación de que se añadido un nuevo curso
 */
function mostrarAlert() {
  Swal.fire({
    position: "center-center",
    icon: "success",
    title: "Curso añadido al carrito",
    showConfirmButton: false,
    timer: 1500,
  });
}
