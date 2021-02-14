const fields = Array.from(document.querySelectorAll(".field"))
const restartButton = document.querySelector("#restart-button")

const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
const boxname2 = document.querySelector("#boxname2");
const start = document.querySelector("#start");
const who = document.querySelector("#who");
const scores = document.querySelector("#scores");

let gameMode = ''

class Game {
    constructor(mode) {
        this.mode = mode
        this.players = [{name: '', score: 0}, {name: '', score: 0}]
        this.turn = 0
        this.score = {}
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
            if (this.mode === 'single' && name1.value.length > 0 ||
                 (this.mode === 'multi' && name1.value.length > 0 && name2.value.length > 0)) {
                this.players[0].name = name1.value
                this.players[1].name = name2.value
                this.isRunning = true
                enableListeners()
                scores.innerText = `${this.players[0].name}: ${this.players[0].score} | ${this.players[1].name}: ${this.players[1].score}`
                if (this.mode === 'multi') who.innerText = `It's your turn ${this.players[0].name}!`
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
        if (this.isRunning && target.innerHTML === '') {
            scores.innerText = `${this.players[0].name}: ${this.players[0].score} | ${this.players[1].name}: ${this.players[1].score}`
            target.innerHTML = this.symbols[this.turn]
            this.board[parseInt(target.id)] = target.innerText
            if (this.checkWin() === true) {
                this.players[this.turn].score++
                scores.innerText = `${this.players[0].name}: ${this.players[0].score} | ${this.players[1].name}: ${this.players[1].score}`
                if (this.mode === 'multi') who.innerText = `It's your turn ${this.players[this.turn].name}!`
                if (this.players[this.turn].score === 3){
                    this.isRunning = false
                    localStorage.setItem('winner', this.players[this.turn].name)
                    localStorage.setItem('scoreFinal', JSON.stringify([{'player': this.players[0].name, 'score': this.players[0].score},
                    {'player': this.players[1].name, 'score': this.players[1].score}]));
                    setTimeout(() => {document.location.href = 'end_game.html'}, 500)
                }
                setTimeout(() => this.reset(), 500)
                return
            } else if (this.board.every(e => e != '')) {
                this.reset()
                return
            }
            this.turn = ++this.turn % 2
            if (this.mode === 'multi') who.innerText = `It's your turn ${this.players[this.turn].name}!`
            //We want IA to play just after a human player moves
            if (this.mode === 'single' && this.players[this.turn].name === 'IA' && this.isRunning) {
                this.play(fields[this.randomEmptyField()])
            }
        }
    }

    reset() {
        this.turn = 0
        this.board.fill('', 0, this.board.length)
        fields.forEach(field => {
            field.innerText = ''
            field.style.color = 'black'
        })
    }

    randomEmptyField() {
        const emptyFields = []
        this.board.forEach((val, i) => val === '' ? emptyFields.push(i) : null)
        const random = Math.floor(Math.random() * emptyFields.length)
        return emptyFields[random]
    }
}


start.addEventListener('click', function () { game.start() })

restartButton.addEventListener('click', function () { game.reset() })

const enableListeners = () => {
    fields.forEach(field => field.addEventListener('click', (e) => {
        if (e.target.innerHTML === '') {
            game.play(e.target)
        }
    }))
}

window.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href)
    mode = url.searchParams.get('mode')

    if (mode === null || (mode !== 'single' && mode !== 'multi')) {
        mode = 'single'
    }
    gameMode = mode
    if (gameMode === 'single') {
        boxname2.parentNode.removeChild(boxname2)
        name2.value = 'IA'
    }
    game = new Game(gameMode)
})
