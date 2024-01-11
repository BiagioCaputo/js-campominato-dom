//recupero gli elementi 
const grid = document.getElementById("grid");
const form = document.querySelector("form");
const dimension = document.getElementById("difficulty");
const button = document.querySelector("button");
const Shownscore = document.getElementById("score");



const startGame = event => {

    event.preventDefault();
    
    /* *********Funzioni interne al gioco********** */
    
    //Funzione per creare una cella
    const createCell = number => {
        const newCell = document.createElement('div');
        newCell.className = 'cell'; 
        newCell.innerText = number; // stampo il numero all'interno
        return newCell;
    }
    
    //Funzione per creare un array di mine
    const createMines = maxNumberMines => {

        //creo un array vuoto 
        const mines = [];

        //creo un ciclo while per ripetere la creazione del random number fino a quando non riempo l'array 
        while(mines.length < maxNumberMines){
            const randomNumber = Math.floor(Math.random() * totalCells) +1;

            //creo un if nel while per impedire che pushi numeri random uguali
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

    //creo una flag che mi servirà successivamente per bloccare il gioco nel caso diventi true, sia per la vittoria che la sconfitta
    let isGameOver = false;


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

     //punteggio per la vittoria

     const pointsVictory = parseInt(totalCells) - parseInt(maxNumberMines);
     console.log("vittoria", pointsVictory);

    //creo le mie mine muahahahha
    const mines = createMines (maxNumberMines);
    console.log(mines);
        

    //creo un ciclo for per ripetere la funzione tante volte quanto il totale delle celle indicato dall'utente
    for(let i = 1; i <= totalCells; i++){
            
        //creo una nuova cella con la i che corrisponde al numero ordinato
        const cell = createCell(i);
        

        //creo l'interazione al click
        cell.addEventListener('click', () => {
            

            //creo un if per tornare indietro nel caso la casella sia già cliccata
            if(cell.classList.contains('clicked') || isGameOver) return;
            
            //funzione per controllare che il giocatore abbia preso la mina
            const hasTakenMine = mines.includes(parseInt(cell.innerText));

            if (hasTakenMine){
                cell.classList.add('mine');
                Shownscore.innerText =`Hai perso, il tuo punteggio è: ${score}`; 
                isGameOver = true;
            } 

            else{
                cell.classList.add('clicked');
                 //incremento il punteggio e lo stampo in pagina
                Shownscore.innerText = ++score;

                if(score === pointsVictory){
                    Shownscore.innerText = "Hai vinto Complimenti";
                    isGameOver = true;
                }     
            }

        })

        //aggiungo la nuova cella alla griglia
        grid.appendChild(cell);
    }


}

//metto in ascolto il form
form.addEventListener('submit', startGame);

//Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
//Generiamoli e stampiamo in console per essere certi che siano corretti
