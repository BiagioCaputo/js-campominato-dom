//recupero gli elementi 
const grid = document.getElementById("grid");
const form = document.querySelector("form");
const dimension = document.getElementById("difficulty");
const button = document.querySelector("button");
const Shownscore = document.getElementById("score");



const startGame = event => {

    event.preventDefault();
    
    /* *********Funzioni interne al gioco********** */
    
    //funzione per creare una cella
    const createCell = (number) => {
        const newCell = document.createElement('div');
        newCell.className = 'cell'; 
        newCell.innerText = number; // stampo il numero all'interno
        return newCell;
    }

    const createMines = (maxNumberMines) => {
        const mines = [];
        
        while(mines.length < maxNumberMines){

            const randomNumber = Math.floor(Math.random() * totalCells) +1;
            if(!mines.includes(randomNumber)) mines.push(randomNumber);
        }

        return mines;
    }
    
    

    /*************** Effettivo svolgimento  ******************* */

    //Cambio il testo del bottone
    button.innerText = "Ricomincia";

    //Svuoto la griglia 
    grid.innerText = "";

    //recupero il valore della tendina
    const level = dimension.value;

    
    let rows= 10;

    let cols = 10;

    let score = 0;

    const maxNumberMines = 16;

    

    switch(level){
        case 'hard':
        rows = 7;
        cols = 7;
        break;
    

    case 'normal':
        rows = 9;
        cols = 9;
        break;
    }

    //assegno la grandezza alla griglia
    grid.classList.add(level);


    //calcolo il totale delle celle
     const totalCells = rows * cols;

    //creo le mie mine muahahahha
    console.log(createMines (maxNumberMines));
        

    //creo un ciclo for per ripetere la funzione tante volte quanto il totale delle celle indicato dall'utente
    for(let i = 1; i <= totalCells; i++){
            
        //creo una nuova cella con la i che corrisponde al numero ordinato
        const cell = createCell(i);
        

        //creo l'interazione al click
        cell.addEventListener('click', () => {
            
            //creo un if per tornare indietro nel caso la casella sia già cliccata
            if(cell.classList.contains('clicked')) return;

            //aggiungo la classe clicked
            cell.classList.add('clicked');
            console.log(i);

            //incremento il punteggio e lo stampo in pagina
            Shownscore.innerText = ++score;
        })

        //aggiungo la nuova cella alla griglia
        grid.appendChild(cell);
    }


}

//metto in ascolto il form
form.addEventListener('submit', startGame);

//Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
//Generiamoli e stampiamo in console per essere certi che siano corretti
