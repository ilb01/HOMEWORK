
const productosTag = document.querySelector('#productos');
const orderFilterTag = document.querySelector('#orderFilter');

let shoesJSON = []; //importante para poder luego ordenar por filas


let shoesFavorites = [];  // importante hacer esto para subirlo a faboritos

window.onload = async () => {
    const respuesta = await fetch('./data/products.json');
    shoesJSON = await respuesta.json();
    printShoes(shoesJSON);
    
    handleFavorites(); //importente poner esto aqui para que favoritos funcione ES LA CONST QUE ESTA EN LA LINEA 113
    
    loadFavorites(); //importente poner esto aqui para que favoritos funcione ES LA CONST QUE ESTA EN LA LINEA 130

    orderFilterTag.addEventListener("change", function(){
        sortShoes();
        
        loadFavorites();// importante poner esto aqui para que favoritos funcione   ES LA CONST QUE ESTA EN LA LINEA 113
        
        handleFavorites(); // importante poner esto aqui para que favoritos funcione   ES LA CONST QUE ESTA EN LA LINEA 130
    });

 };




 // pintar las tarjetas aqui se  pone los corazones como las imagenes para poner corazones en css hay qu poner este link
//  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
 
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

 
 //para ordenar por cuadriculas explicado mejor en drabon ball
 
 const changeView = (number)=>{
    if (number===4){
        productosTag.classList.replace("grid-6", "grid-4");
    }else if (number===6){
        productosTag.classList.replace("grid-4", "grid-6");
    }
 };

 
//  filtrar explicado mejor en dragon ball
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

 
 
 
 
 
 // Pintar el corazon de negro a rojo y al reves
 
 const handleFavorites = ()=>{
    const favoritesList = document.querySelectorAll(".fa-heart");
    favoritesList.forEach(fav => {
        fav.addEventListener("click", function(){
           // This es el icono HTML en el cual el usuario acaba de pulsar
            
           this.classList.toggle("on"); //esto es hace referencia al css para cambiar de color EL on hace referencia al .on del css si tenemos otro nombre hay que reemplazarlo por e que hemos puesto en css
            saveFavorites(this);
  
        });
    });
    
 };

 // localStorage  para que el navegador guerde los favorits marcados

// shoesFavorites esta en la LINA 8 es el array vacio del principio

 const saveFavorites =(corazon)=>{
   let idFavorite = corazon.dataset.id;
   if(corazon.classList.contains("on")){
       // Add favorite
       shoesFavorites.push({"id":idFavorite});
   }else{
       // Delete favorite
       shoesFavorites = shoesFavorites.filter(e=>e.id != idFavorite);
   }
   // Save favorite
   localStorage.setItem("shoesFavorites", JSON.stringify(shoesFavorites));
 };


 
// NO SE BIEN LO QUE HACE PERO TAMBIEN HAY QUE PONERLO
 
const loadFavorites =()=>{
     if (localStorage.getItem("shoesFavorites")){
        shoesFavorites = JSON.parse(localStorage.getItem("shoesFavorites"));
     }else{
        shoesFavorites=[];
     }
   
    shoesFavorites.forEach(fav => {
        document.querySelector(`.fa-heart[data-id="${fav.id}"]`).classList.add("on");
    });
 };