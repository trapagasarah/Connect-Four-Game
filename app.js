$(function () {
    for (let i = 0; i < 6; i++) {
        let row = $('<div></div>')
        row.addClass('row')
        for (let j = 0; j < 7; j++) {
            let gameSquare = $('<div></div>')
            gameSquare.addClass('game-square')
            row.append(gameSquare)
        }
        $('#game-board').append(row)
    }
})
