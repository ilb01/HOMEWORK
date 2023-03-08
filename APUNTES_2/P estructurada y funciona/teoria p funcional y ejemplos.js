/*

Arrays - metodo 2

Array.from(iterable) - Convierte en array el elemento iterable


.sort([callback]) - Ordena los elementos de un array alfabeticamente (valor unicode), si le pasamos un callback los ordena en función del algoritmo que le pasemos.


.forEach(callback(currentValue, [index])) - ejecuta la funcion indicada una vez po cada elemento del array


.some(callback) - comprueba si al menos un elemento del array cumpla la condicion


.every(callback) - comprueba si todos los elementos de un array cumplen la condición


.map(callback) - transforma todos los elementos del array y devuelve un nuevo array


.filter(callback) - filtra todos los elementos del array que cumplan la condicion y devule un nuevo array


.reduce(callback) - reduce todos los elementos del array a un único valor

.find(callbkac) - nos permite buscar una cosa en concreta y no la devulve en una array como filter

*/


// Array.from(nombre de la variable)

console.log('.from para combertirlo en un array')

let word = 'hola puto mundo'
console.log(Array.from(word))//lo convierte en un array
console.log(word.split(','))// tambien nos combierte la palabra en un array

console.log('  ')
console.log('.sort para ordenar alfabeticamente')

// variable.sort()

const letras = ['e', 't', 'a', 'd']
console.log(letras.sort())// lo ordena alfaabeticamente si es letras

console.log('  ')
console.log('.sort para ordenar numericamente de menor a mayor')

const numeros = [5, 1, 9, 6, 2, 7, 3, 8, 0, 4]
console.log(numeros.sort((a, b) => a - b))//ordenar numeros de menor a mayor

console.log('  ')
console.log('.sort para ordenar numericamente de mayor a menor')

console.log(numeros.sort((a, b) => b - a))//ordena numeros de mayor a menor


console.log('  ')
console.log('.forEach para sacar del array los numeros')


// forEach()

const num = [34, 76, 2, 90, 68]

num.forEach((num) => console.log(num))//sacamos del array los numeros

console.log('  ')
console.log('.forEach con index para saber la posicion de los numeros')
num.forEach((num, index) => console.log(`${num} esta en la pasición ${index}`)) // asi sabemos que posicion se encuentra en la array el numero

console.log('  ')
console.log('.some comprueba si un elemento de la array cumple la condicion y nos dara true o false')

// .some(nombre que queramos => variable)

const pal = ['html', 'css', 'javascript', 'php']

console.log(pal.some(pal => pal.length > 2))
console.log(pal.some(pal => pal.length < 2))

console.log('  ')
console.log('.every comprueba si todos los elementos de la array cumple la condicion y nos dara true o false')

// variable.every(nombre que queramos dar => variable)

console.log(pal.every(pal => pal.length > 1))
console.log(pal.every(pal => pal.length < 1))


console.log('  ')
console.log('.map transforma el array y nos devuelve un nuevo array')

// variable.map( lo que queramos poner =>console.log(ponemos lo que queramos que haga) )

const nummeros = [2, 7, 23, 90, 34, 12]

nummeros.map(mult => console.log(mult * 2)) //transforma el array y nos devulve un nuevo array

// es lo mismo que poner for

console.log('  ')
console.log('for')

for (const num34 of nummeros) {
    console.log(num34 * 2)
}


console.log('  ')
console.log('.filter filtras los elementos del array que cumplan la condición y los devuelve en un nuevo array')

// variable.filter( lo que queramos poner =>console.log(ponemos lo que queramos que haga) )

const num12 = [4, 78, 90, 102, 25, 78, 23, 12]

console.log('  ')
console.log('.filter nos indica con true o con false cual cumple y no cumple la condicion')

num12.filter(num12 => console.log(num12 > 50))


console.log('  ')
console.log('.filter nos indica que numeros cumple la condicion')

// const nombre-Que-Le-Queremos-Dar = nombre-Array-Creada.filter (nombre-Diferente => nombre-Diferente y lo que queremos que haga)

// console.log(nombre le hemos dados a nuestra const)

const numbers2 = num12.filter(a => a > 50)
console.log(numbers2)


console.log('  ')
console.log('.reduce cojemos todos los elementos del array y lo reducimos a un unico valor')

// console.log(nombre de la variable.reduce((a,b)=>lo que queramos que haga))

const nemeros = [4, 7, 8, 100, 45, 12, 11, 456]
console.log(nemeros.reduce((a, b) => a + b)) //con esto sumamos todos los numeros

console.log('  ')
console.log('.reduce en este casos nos indica los usuarios online totales')


const users = [
    {
        name: 'user 1',
        online: true
    },
    {
        name: 'user 2',
        online: true
    },
    {
        name: 'user 3',
        online: false
    },
    {
        name: 'user 4',
        online: false
    },
    {
        name: 'user 5',
        online: false
    },
    {
        name: 'user 6',
        online: true
    },

]

const userOnline = users.reduce((cont, users) => {
    if (users.online) cont++
    return cont
}, 0)

console.log(`Hay ${userOnline} usuarios conetados`)

console.log('')
console.log('.find para buscar algo en concreto')

// Este es un ejemplo de la clase no estaba en el video de Dorian 

function ex11Filter(products) {
    return products.find(pro => pro.category === "GAME" && pro.name.includes("The Witcher"));
}

