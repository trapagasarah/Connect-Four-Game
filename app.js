const empty = ''
let playerOne = ''
let playerTwo = ''
let currentPlayer = playerOne

let tokenChoices = ['🐱', '🐰', '🦊', '🐻', '🦉', '🐺', '🦇', '🦄', '🐝', '🐛', '🦋', '🐞', '🐜', '🐍', '🦎', '🦝', '🐿', '🦔', '🍀', '🍄']
let tokenSelection = function () {
    for (let i = 0; i < tokenChoices.length; i++) {
        let tokenSquare1 = $(`<div>${tokenChoices[i]}</div>`)
        let tokenSquare2 = $(`<div>${tokenChoices[i]}</div>`)
        tokenSquare1.addClass('token-square')
        tokenSquare2.addClass('token-square')
        tokenSquare1.click(function () {
            if (tokenChoices[i] !== playerTwo) {
                playerOne = tokenChoices[i]
                onAnimalClick(playerOne, '#selected-token1')
            } else {
                alert('Whoops, same choice!! Pick again!')
            }
        })
        tokenSquare2.click(function () {
            if (tokenChoices[i] !== playerOne) {
                playerTwo = tokenChoices[i]
                onAnimalClick(playerTwo, '#selected-token2')
            } else {
                alert('Whoops, same choice!! Pick again!')
            }
        })
        $('#player1-token').append(tokenSquare1)
        $('#player2-token').append(tokenSquare2)
    }
}
let onAnimalClick = function (player, divClass) {
    $(divClass).html(player)
    if (playerOne !== '' && playerTwo !== '') {
        currentPlayer = playerOne
        drawBoard()
        $('#player1-token').remove()
        $('#player2-token').remove()

    }
}

let gameBoard = [
    [empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty],
]

let drawBoard = () => {
    $('#game-board').html('')
    for (let i = 0; i < gameBoard.length; i++) {
        let row = $('<div></div>')
        row.addClass('row')
        for (let j = 0; j < gameBoard[i].length; j++) {
            let gameSquare = $(`<div>${gameBoard[i][j]}</div>`)
            gameSquare.addClass('game-square')
            gameSquare.click(function () {
                insertPiece(j)
            })
            row.append(gameSquare)
        }
        $('#game-board').append(row)
    }
}


let insertPiece = function (column) {
    let row
    let didPlacePiece = false

    for (let i = 5; i >= 0; i--) {
        if (gameBoard[i][column] === empty && didPlacePiece === false) {
            gameBoard[i][column] = currentPlayer
            didPlacePiece = true
            row = i
        }
    }
    if (didPlacePiece) {
        if (checkColumnForWinner(column) || checkRowForWinner(row) || checkDiagonalDownRightForWinner(row, column) || checkDiagonalUpRightForFour(row, column)) {
            let loser = currentPlayer === playerOne ? playerTwo : playerOne
            alert(`${currentPlayer} wins!! \n Sorry ${loser} try again!!`)
            score()
        }
        changeTurn()
    }
    drawBoard()
}
let changeTurn = function () {
    if (currentPlayer === playerOne) {
        currentPlayer = playerTwo
    } else {
        currentPlayer = playerOne
    }
}
let checkColumnForWinner = function (column) {
    let didWin = false
    let checkForFour = 0
    for (let i = 0; i < gameBoard.length; i++) {
        let currentSquare = gameBoard[i][column]
        if (currentSquare === currentPlayer) {
            checkForFour++
        } else {
            checkForFour = 0
        }
        if (checkForFour === 4) {
            didWin = true
        }
    }
    return didWin
}
let checkRowForWinner = function (row) {
    let didWin = false
    let checkForFour = 0
    for (let j = 0; j < gameBoard[0].length; j++) {
        let currentSquare = gameBoard[row][j]
        if (currentSquare === currentPlayer) {
            checkForFour++
        } else {
            checkForFour = 0
        }
        if (checkForFour === 4) {
            didWin = true
        }
    }
    return didWin
}
let checkDiagonalDownRightForWinner = function (row, column) {
    let didWin = false
    let checkForFour = 0
    let min = row < column ? row : column
    for (let i = row - min, j = column - min; i < gameBoard.length && j < gameBoard[0].length; i++ , j++) {

        let currentSquare = gameBoard[i][j]
        if (currentSquare === currentPlayer) {
            checkForFour++
        } else {
            checkForFour = 0
        }
        if (checkForFour === 4) {
            didWin = true
        }
    }
    return didWin
}
let checkDiagonalUpRightForFour = function (row, column) {
    let didWin = false
    let checkForFour = 0
    let distanceToBottom = gameBoard.length - row - 1
    let distanceToLeft = column
    let shortestDistance = distanceToBottom < distanceToLeft ? distanceToBottom : distanceToLeft
    console.log(shortestDistance)
    for (let i = row + shortestDistance, j = column - shortestDistance; i >= 0 && j < gameBoard[0].length; i-- , j++) {

        let currentSquare = gameBoard[i][j]
        if (currentSquare === currentPlayer) {
            checkForFour++
        } else {
            checkForFour = 0
        }
        if (checkForFour === 4) {
            didWin = true
        }
    }
    return didWin
}

let resetBoard = function () {
    gameBoard = [
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
    ]
    drawBoard()
}

let playerOneScore = 0
let playerTwoScore = 0
let score = function () {
    if (currentPlayer === playerOne) {
        playerOneScore++
    } else {
        playerTwoScore++
    }
    $('.player1-score').html('Score: ' + playerOneScore)
    $('.player2-score').html('Score: ' + playerTwoScore)
}





$(function () {
    tokenSelection()
    //drawBoard()
    $('#reset-button').click(function () {
        console.log('reset board')
        resetBoard()
    })
    $('#game-board').mousemove(function () {
        $('.cursor').remove()
        let cursor = $(`<div>${currentPlayer}</div>`)
            .addClass('cursor')
            .css('left', event.clientX - 30)
            .css('top', event.clientY - 40)
        $('#game-board').append(cursor)
    })
    $('#game-board').mouseleave(function () {
        $('.cursor').remove()

    })

})

