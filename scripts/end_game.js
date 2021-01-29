let confettiPlayers = [];
const title = document.querySelector('h1');
const image_player = document.querySelector('img');
const link_acceuil = document.querySelector('a');
localStorage.setItem('winner', 'ia');
let winner = localStorage.getItem('winner');
const textPlayer = `Bravo ${winner}, vous avez gagné`;
const imgPlayer = '../img/trophy.jpg';
const textIa = 'Dommage vous avez perdu';
const imgIa = '../img/sad_face.png'

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
  if (winner === 'player1' || winner === 'player2') {
    changeElement(textPlayer, imgPlayer);
    makeItConfetti();
  } else if (winner === 'ia') {
    document.querySelector('body').classList.add('rainEffect');
    changeElement(textIa, imgIa);
    document.body.style.backgroundColor = "#696969";
  }
}

window.addEventListener('DOMContentLoaded', () => {
  celebration();
})

