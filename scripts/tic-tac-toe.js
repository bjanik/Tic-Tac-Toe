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


const getIndexes = (array, value) => {
    let indexes = []
    for (i = 0; i < array.length; i++) {
        if (array[i] === value)
            indexes.push(i)
    }
    return indexes
}

const checkWin = () => {
    const indexes = getIndexes(board, symbols[turn])
    for (let i = 0; i < winningCombos.length; i++) {
        if (winningCombos[i].every(val => indexes.includes(val))) {
            winningCombos[i].forEach(combo => fields[combo].style.color = 'red')
            return true
        }
    }
}

const enableListeners = () => {
    fields.forEach(field => field.addEventListener('click', () => {
        if (gameRunning && field.innerHTML === '') {
            field.innerHTML = symbols[turn]
            board[parseInt(field.id)] = field.innerHTML
            if (checkWin() === true) {
                console.log("THERE IS A WIN!")
                gameRunning = false
            }
            turn = ++turn % 2
        }
    }))
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
    board.fill("", 0, 8)
})