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
    createBoard()

    return {
        createBoard,
        resetBoard,
        updateBoard
    }
})()




const gameFlow = (function() {
    let currentTurn = 'x';
    let winner = '';
    let playerArray = [[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9],
                       [1, 4, 7],
                       [2, 5, 8],
                       [3, 6, 9],
                       [1, 5, 9],
                       [3, 5, 7]];



    function checkForWinner() {
        let tieCount = 0
        for (i = 0; i < playerArray.length; i++) {
            if (playerArray[i][0] === 'x' &&
                playerArray[i][1] === 'x' &&
                playerArray[i][2] === 'x') {
                console.log('winner is x')

            } else if (playerArray[i][0] === 'o' &&
                playerArray[i][1] === 'o' &&
                playerArray[i][2] === 'o') {
                console.log('winner is o')
            }else if (playerArray[i].includes('x') && playerArray[i].includes('o')){
                tieCount++
            }
        }
        if (tieCount > 7) {console.log('tie')}
    }



    function changeTurn() {
        currentTurn = currentTurn === 'x' ? 'o' : 'x';
    }

    function playerTurn() {
        let markPosition;
        let boxes = document.querySelectorAll(".box");
        for (i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', (e) => {
                markPosition = parseInt(e.target.id);
               
                for (i = 0; i < playerArray.length; i++) {
                    if (playerArray[i].includes(markPosition)){
                    let turnPos =  playerArray[i].indexOf(markPosition);
                    playerArray[i].splice(turnPos, 1, `${currentTurn}`)}
                }

                boardController.updateBoard(currentTurn, markPosition)
                checkForWinner()
                changeTurn()
            }, false)
        }
    }

    return{playerTurn, playerArray, checkForWinner}


})()



