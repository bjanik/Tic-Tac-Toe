let confettiPlayers = [];
const title = document.querySelector('h1');
const image_player = document.querySelector('img');
const link_acceuil = document.querySelector('a');
let winner = localStorage.getItem('winner');
localStorage.setItem('winner', 'ia');
const dataPlayer = {text:`Bravo ${winner}, vous avez gagné! `, pict: '../img/trophy.jpg'};
const dataIa = {text: 'Dommage vous avez perdu', pict: '../img/sad_face.png'};
localStorage.setItem('scoreFinal', JSON.stringify([{'player': 'Stephane', 'score': 3}, {'player': 'Eddy', 'score': 5}]));
const dataEndGame = JSON.parse(localStorage.getItem('scoreFinal'));
const score_player = document.querySelector('#score_game');


const makeItConfetti = () => {
  const confetti = document.querySelectorAll('.confetti');
  
  if (!confetti[0].animate) {
    return false;
  }

  for (let i = 0, len = confetti.length; i < len; ++i) {
    let snowball = confetti[i];
    snowball.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
    const scale = Math.random() * .8 + .2;
    let player = snowball.animate([
      { transform: 'translate3d(' + (i/len*100) + 'vw,0,0) scale(' + scale + ')', opacity: scale },
      { transform: 'translate3d(' + (i/len*100 + 10) + 'vw,100vh,0) scale(' + scale + ')', opacity: 1 }
    ], {
      duration: Math.random() * 3000 + 3000,
      iterations: Infinity,
      delay: -(Math.random() * 5000)
    });
    confettiPlayers.push(player);
  }
}

const changeElement = (textCongrat, pathImage) => {
  title.innerText = textCongrat;
  link_acceuil.innerText = 'Rejouer';
  image_player.src = pathImage;
}

const celebration = () => {
  if (winner !== null && winner !== 'ia' && winner !== '' && winner !== 'undefined') {
    changeElement(dataPlayer.text, dataPlayer.pict);
      score_player.innerHTML = `<div><h2>${dataEndGame[0]['player']}</h2><p>score: ${dataEndGame[0]['score']}</p></div>
      <div><h2>${dataEndGame[1]['player']}</h2><p>score: ${dataEndGame[1]['score']}</p></div>`;
    makeItConfetti();
  } else if (winner === 'ia') {
    document.querySelector('body').classList.add('rainEffect');
    changeElement(dataIa.text, dataIa.pict);
    score_player.innerHTML = `<div><h2>${dataEndGame[0]['player']}</h2><p>score: ${dataEndGame[0]['score']}</p></div>
      <div><h2>ia</h2><p>score: 5</p></div>`;
    document.body.style.backgroundColor = "#151413";
  }
}

// activation de la fonction celebration lorsque la page html est chargé
window.addEventListener('DOMContentLoaded', () => {
  celebration();
})

