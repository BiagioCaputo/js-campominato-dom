//recupero gli elementi 
const grid = document.getElementById("grid");
const form = document.querySelector("form");
const dimension = document.getElementById("difficulty");
const button = document.querySelector("button")



const startGame = event => {

    event.preventDefault();
    
    /* *********Funzioni interne al gioco********** */
    
    //funzione per creare una cella
    const createCell = (number, cols) => {
        const newCell = document.createElement('div');
        newCell.className = 'cell'; 
        newCell.innerText = number; // stampo il numero all'interno
        return newCell;
    }
    
    

    /*************** Effettivo svolgimento  ******************* */

    //Cambio il testo del bottone
    button.innerText = "Ricomincia";

        //Svuoto la griglia 
    grid.innerText = "";

    //recupero il valore della tendina

    const level = dimension.value;

    grid.classList.add(level);

    
    let rows= 10;

    let cols = 10;

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

     //calcolo il totale delle celle
     const totalCells = parseInt(rows) * parseInt(cols);
     console.log(totalCells);
        

        //creo un ciclo for per ripetere la funzione tante volte quanto il totale delle celle indicato dall'utente
    for(let i = 1; i <= totalCells; i++){
            
            //creo una nuova cella con la i che corrisponde al numero ordinato
        const cell = createCell(i);

            //creo l'interazione al click
        cell.addEventListener('click', () => {
                
            cell.classList.toggle('clicked');

            if(cell.classList.contains('clicked')) return;
                console.log(i);
            }
            );

            //aggiungo la nuova cella alla griglia
        grid.appendChild(cell);
        }


    }

//metto in ascolto il form
form.addEventListener('submit', startGame );
