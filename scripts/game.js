const fields = Array.from(document.querySelectorAll(".field"))
const restartButton = document.querySelector("#restart-button")

const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
const start = document.querySelector("#start");
const who = document.querySelector("#who");


class Game {
    constructor(name1, name2) {
        this.players = []
        this.turn = 0
        this.symbols = ['X', 'O']
        this.isRunning = false
        this.board = ['','','','','','','','','']
        this.winningCombos = [  [0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 3, 6],
                                [1, 4, 7],
                                [2, 5, 8],
                                [0, 4, 8],
                                [2, 4, 6]
                            ]
    }

    start() {
        if (!this.isRunning) {
            if (name1.value.length > 0 && name2.value.length > 0) {
                this.players = [name1.value, name2.value].sort(() => Math.random() - 0.5)
                this.isRunning = true
                enableListeners()
                who.innerHTML = `It's your turn ${this.players[0]}!`
            } else {
                who.innerText = 'Please enter a valid name';
            }
        }
    }

    checkWin() {
        let indexes = []
        this.board.forEach((val, i) => val === this.symbols[this.turn] ? indexes.push(i) : null)
        for (let i = 0; i < this.winningCombos.length; i++) {
            if (this.winningCombos[i].every(val => indexes.includes(val))) {
                this.winningCombos[i].forEach(combo => fields[combo].style.color = 'red')
                return true
            }
        }
        return false
    }

    play(target) {
        if (this.isRunning) {
            target.innerHTML = this.symbols[this.turn]
            this.board[parseInt(target.id)] = target.innerHTML
            if (this.checkWin() === true) {
                this.isRunning = false
                localStorage.setItem('winner', this.players[this.turn])
                setTimeout(() => {document.location.href = 'end_game.html'}, 3000)
            } else {
                this.turn = ++this.turn % 2
                who.innerHTML = `It's your turn ${this.players[this.turn]}!`
            }
        }
    }

    reset() {
        this.turn = 0
        this.isRunning = false
        this.board.fill('', 0, this.board.length)
        fields.forEach(field => {
            field.innerHTML = ''
            field.style.color = 'black'
        })
    }
}

let game = new Game()

start.addEventListener('click', function () { game.start() })

restartButton.addEventListener('click', function () { game.reset() })

const enableListeners = () => {
    fields.forEach(field => field.addEventListener('click', (e) => {
        if (e.target.innerHTML === '') {
            game.play(e.target)
        }
    }))
}