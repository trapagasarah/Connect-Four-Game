const empty = ''
const playerOne = '🦊'
const playerTwo = '🐻'
let currentPlayer = playerOne

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
            alert('Winner!!!')
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
    for (let i = 0; i < gameBoard[0].length; i++) {
        console.log(i + ' ' + row)
        let currentSquare = gameBoard[row][i]
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

$(function () {
    drawBoard()


})
