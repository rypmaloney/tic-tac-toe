const container = document.getElementById('container');

//Gameboard 
const gameBoard = [1, 2, 'x', 4, 5, 'o', 7, 8, 9]

const winningCombos = [[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9],
                       [1, 4, 7],
                       [2, 5, 8],
                       [3, 6, 9],
                       [1, 5, 9],
                       [3, 5, 7]]

//creates grid adds corresponding ID--index +1 
function displayBoard() {

    resetBoard()

    for (i = 0; i < gameBoard.length; i++) {
        let gameSquare = document.createElement('div');
        gameSquare.setAttribute('id', `${i + 1}`);
        gameSquare.classList.add('box');
        container.appendChild(gameSquare);
        gameSquare.addEventListener('click', (e) => takeBox(e))

        let mark = document.createElement('p');
        mark.classList.add('mark');
        gameSquare.appendChild(mark);

        if (gameBoard[i] === 'x') {
            mark.textContent = 'X'

        } else if (gameBoard[i] === 'o') {
            mark.textContent = 'O'
        }
    }
}



//Change gameboard array by adding player selection-- change 'x' to some playerMark variable

function takeBox(e) {
    gameBoard[e.target.id - 1] = 'x';
    displayBoard()
}


//resets gameboard -- end of game & to display board
function resetBoard() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


displayBoard()





//player factory
const player = (mark, ? ) => {

    /*Need to be assigned a mark - x or o
    /* Needs function to change gameBoard*/

}
