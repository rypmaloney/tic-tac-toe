
//MODULE 1: FUNCTIONS THAT CREATE AND DESTROY THE GAME BOARD
const boardController = (function () {

    const container = document.getElementById('container');
    const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    function createBoard() {
        resetBoard()
        for (i = 0; i < gameBoard.length; i++) {
            let gameSquare = document.createElement('div');
            gameSquare.setAttribute('id', `${i + 1}`);
            gameSquare.classList.add('box');
            container.appendChild(gameSquare);
        }
    }


    function updateBoard(player, position) {
        let newBoard
        let newMark = gameBoard.indexOf(position)
        gameBoard.splice(newMark, 1, player)

        markPos = document.getElementById(`${position}`);
        let mark = document.createElement('p');
        mark.classList.add('mark');
        markPos.appendChild(mark);
        mark.textContent = `${player.toUpperCase()}`

    }

    function resetBoard() {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    function resetGame() {
        resetBoard()
        createBoard()
    }



    createBoard()

    return {
        createBoard,
        resetGame,
        updateBoard
    }
})()



//MODULE 2: FUNCTIONS THAT KEEP SCORE AND CONTROL FLOW OF GAME
const gameFlow = (function () {
    let currentTurn = 'x';
    let playerArray = [[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9],
                       [1, 4, 7],
                       [2, 5, 8],
                       [3, 6, 9],
                       [1, 5, 9],
                       [3, 5, 7]];

    function playerArrayReset() {
        playerArray = [[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9],
                       [1, 4, 7],
                       [2, 5, 8],
                       [3, 6, 9],
                       [1, 5, 9],
                       [3, 5, 7]];
    }

    function fetchComputerOptions() {
        let computerOptions = playerArray;
        return computerOptions;
    }

    function checkForWinner() {
        let tieCount = 0
        for (i = 0; i < playerArray.length; i++) {
            if (playerArray[i][0] === 'x' &&
                playerArray[i][1] === 'x' &&
                playerArray[i][2] === 'x') {
                DOMController.roundAnnounce.textContent = 'X is the winner!';

            } else if (playerArray[i][0] === 'o' &&
                playerArray[i][1] === 'o' &&
                playerArray[i][2] === 'o') {
                DOMController.roundAnnounce.textContent = 'O is the winner!';


            } else if (playerArray[i].includes('x') && playerArray[i].includes('o')) {
                tieCount++
            }
        }
        if (tieCount > 7) {
            DOMController.roundAnnounce.textContent = 'Tie, restart the game.'
        }
    }

    function changeTurn() {
        currentTurn = currentTurn === 'x' ? 'o' : 'x';
        DOMController.roundAnnounce.textContent = `${currentTurn.toUpperCase()} Turn`;
    }

    function playerTurn() {
        let markPosition;
        let boxes = DOMController.boxes;
        for (i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', (e) => {
                markPosition = parseInt(e.target.id);

                for (i = 0; i < playerArray.length; i++) {
                    if (playerArray[i].includes(markPosition)) {
                        let turnPos = playerArray[i].indexOf(markPosition);
                        playerArray[i].splice(turnPos, 1, `${currentTurn}`)
                    }
                }

                boardController.updateBoard(currentTurn, markPosition);
                changeTurn();
                checkForWinner();

            }, false)
        }
    }

    return {
        playerTurn,
        fetchComputerOptions,
        playerArrayReset,
        checkForWinner
    }
})()



//MODULE 3: DOM ELEMENTS
const DOMController = (function () {
    const scoreBoard = document.getElementById('scoreBoard');
    const roundAnnounce = document.createElement('p')
    roundAnnounce.classList.add('annoucement');
    scoreBoard.appendChild(roundAnnounce);
    roundAnnounce.textContent = '';

    const resetBtn = document.getElementById('reset')
    resetBtn.addEventListener('click', () => {
        boardController.resetGame();
        gameFlow.playerArrayReset();
        boxes.forEach(box => box.style.pointerEvents = 'all')
    })

    const startBtn = document.getElementById('start');
    startBtn.addEventListener('click', () => {
        gameFlow.playerTurn();
        roundAnnounce.textContent = 'X Turn';
    })

    const boxes = document.querySelectorAll(".box");


    return {
        roundAnnounce,
        boxes,
 
    }
})()




/*
function computerStrategy() {
    //Loop through player array, put available win options in computerOptions
    let computerOptions = fetchComputerOptions();
    for (i = 0; i < computerOptions.length; i++) {
        if (computerOptions[i].includes('x')) {
            computerOptions.splice(i, 1);
        }
        
        //Checks how close each computerOption is to winning
        let numOfO = 0;
        for (j = 0; j < computerOptions[i].length, j++){
            if (computerOptions[i][j] === 'o'){
                numOfO++
            }
            }
        if (numOf0 > 1){
            //GO HERE!
        } 
    }

}
*/
