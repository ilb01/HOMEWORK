

const tabla = document.getElementById('tabla')

function empleados() {
  fetch("./data/trabajadores.json")
    .then(res => res.json())
    .then(data => {
      trabajadores = data
      renderInformaccion()
    })
}

function renderInformaccion() {
  tabla.innerHTML = '';
  trabajadores.forEach(trabajador => {

    tabla.innerHTML += `
      
      <tr>
        <td>${trabajador.id}</td>
        <td>${trabajador.nombre}</td>
        <td>${trabajador.telefono}</td>
        <td>${trabajador.especialidad}</td>
        <td>${trabajador.departamentos}</td>
      </tr>
      
      `

  });

}

function init() {
  empleados()
}
init()