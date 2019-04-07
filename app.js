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
    let didPlacePiece = false
    for (let i = 5; i >= 0; i--) {
        if (gameBoard[i][column] === empty && didPlacePiece === false) {
            gameBoard[i][column] = currentPlayer
            didPlacePiece = true
        }
    }
    if (didPlacePiece){
        changeTurn()
    }
    drawBoard()
}
let changeTurn = function() {
    if (currentPlayer === playerOne){
        currentPlayer = playerTwo
    } else {
        currentPlayer = playerOne
    }
}

$(function () {
    drawBoard()


})
