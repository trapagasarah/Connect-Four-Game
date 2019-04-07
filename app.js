const empty = ''
const playerOne = '🦊'
const playerTwo = '🐻'

let gameBoard = [
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,playerTwo,empty,empty,playerOne,empty,empty],
    [empty,playerOne,empty,playerTwo,empty,empty,empty],
]



$(function () {
    for (let i = 0; i < gameBoard.length ; i++) {
        let row = $('<div></div>')
        row.addClass('row')
        for (let j = 0; j < gameBoard[i].length; j++) {
            let gameSquare = $(`<div>${gameBoard[i][j]}</div>`)
            gameSquare.addClass('game-square')
            row.append(gameSquare)
        }
        $('#game-board').append(row)
    }
    
})
