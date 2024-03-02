const palabras = ['MANZANA', 'BANANA', 'SANDIA', 'NARANJA', 'UVA', 'TOMATE', 'KIWI', 'MANGO'];
let palabra;
let intentos = 6;
let grid;

function selectRandomWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}
const endpoint = "https://random-word-api.herokuapp.com/word?length=5";

fetch(endpoint).then((response) => {
    response.json().then((data) => {
        console.log(data[0]);
        palabra = data[0].toUpperCase();
    });
});
function getWord(){
    let min = 0;
    let max = diccionario.length;
    let i = Math.floor(Math.random() * (max-min))+min;
    return diccionario[i];
}
console.log(palabra);

window.addEventListener('load', init);

function init() {
    console.log('Esto se ejecuta solo cuando se carga la pagina web');
    grid = document.getElementById("grid");
}

const button = document.getElementById("guess-button");

button.addEventListener("click", intentar);

function intentar() {
    const INTENTO = leerIntento();
    console.log(INTENTO);
    const row = document.createElement('div');
    const ERROR = document.getElementById("error");
    row.className = 'row';
    if(INTENTO.length!==5){
        ERROR.innerHTML="La palabra debe de ser de 5 letras";
        ERROR.style.display="block";
    }else{
        ERROR.style.display="none";
    if (INTENTO === palabra) {
        for (let i in palabra) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.innerHTML = palabra[i];
            span.style.backgroundColor = '#79b851';
            row.appendChild(span);
        }
        grid.appendChild(row);  // Agrega la fila al contenedor (grid)
        terminar("<h1>GANASTE!😀</h1>");
        return;
    }

    for (let i in palabra) {
        const span = document.createElement('span');
        span.className = 'letter';

        if (INTENTO[i] === palabra[i]) {
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#79b851';
        } else if (palabra.includes(INTENTO[i])) {
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#f3c237';
        } else {
            const letraIntento = INTENTO[i] ?? '-';
            console.log(letraIntento, "GRIS");
            span.innerHTML = letraIntento;
            span.style.backgroundColor = 'grey';
        }
        row.appendChild(span);
    }

    intentos--;

    if (intentos === 0) {
        terminar("<h1>PERDISTE!😖</h1>");
    }

    grid.appendChild(row);  // Agrega la fila al contenedor (grid)
    }
}
function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    return intento.toUpperCase();
}

function terminar(mensaje) {
    const input = document.getElementById("guess-input");
    const boton = document.getElementById("guess-button");
    input.disabled = true;
    boton.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
