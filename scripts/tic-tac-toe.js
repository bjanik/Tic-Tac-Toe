const fields = Array.from(document.querySelectorAll(".field"))
const restartButton = document.querySelector("#restart-button")

let turn = 0
let gameRunning = true
const symbols = ['X', 'O']

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const board = ["", "", "", "", "", "", "", "", ""]


const getIndexes = (value) => {
    let indexes = []
    for (i = 0; i < board.length; i++) {
        if (board[i] === value)
            indexes.push(i)
    }
    return indexes
}

const checkWin = () => {
    const indexes = getIndexes(symbols[turn])
    for (let i = 0; i < winningCombos.length; i++) {
        if (winningCombos[i].every(val => indexes.includes(val))) {
            winningCombos[i].forEach(combo => fields[combo].style.color = 'red')
            return true
        }
    }
}

const play = (field) => {
    if (gameRunning && field.innerHTML === '') {
        field.innerHTML = symbols[turn]
        board[parseInt(field.id)] = field.innerHTML
        if (checkWin(board) === true) {
            gameRunning = false
        }
        turn = ++turn % 2
    }
}

const enableListeners = () => {
    fields.forEach(field => field.addEventListener('click', e => play(e.target)))
}

enableListeners()

restartButton.addEventListener('click', () => {
    gameRunning = true
    turn = 0
    fields.forEach(field => {
        field.innerHTML = ''
        field.style.color = 'black'
    })
    enableListeners()
    board.fill('', 0, 8)
    console.log(board)
})
