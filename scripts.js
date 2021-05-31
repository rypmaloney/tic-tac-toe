const container = document.getElementById('container');




//Gameboard 
const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]

let playerArray = [[1, 2, 3],
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






//resets gameboard -- end of game & to display board
function resetBoard() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}




//Player Factory
const player = (mark) => {
    const playerTurn = () => {
        let boxes = document.querySelectorAll(".box");

        for (i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', (e) => {
                //adds Eventlistener - adds player.mark to gameboard -> updates board
                gameBoard[e.target.id - 1] = `${mark}`;
                displayBoard()

                //replaces all instances of turn position in the player array with player.mark
                for (i = 0; i < playerArray.length; i++) {
                    turnPos = playerArray[i].indexOf(parseInt(e.target.id));
                    playerArray[i].splice(turnPos, 1, `${mark}`)

                }
            })
        }
    }
    return {
        playerTurn,
        mark,
        playerArray
    }
}


//check for winner

function checkForWinner() {
    for (i = 0; i < playerArray.length; i++) {
        if (playerArray[i][0] === 'x' &&
            playerArray[i][1] === 'x' &&
            playerArray[i][2] === 'x') {
            console.log('playerx won!')
        
        } else if (playerArray[i][0] === 'o' && 
                   playerArray[i][1] === 'o' &&
                   playerArray[i][2] === 'o') {
            console.log('playero won!')
        }}
    }




displayBoard()
