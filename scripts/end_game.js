let confettiPlayers = [];
const title = document.querySelector('h1');
const image_player = document.querySelector('img');
const link_acceuil = document.querySelector('a');
localStorage.setItem('winner', '');
let winner = localStorage.getItem('winner');
const dataPlayer = {text:`Bravo ${winner}, vous avez gagné! `, pict: '../img/trophy.jpg'};
const dataIa = {text: 'Dommage vous avez perdu', pict: '../img/sad_face.png'};

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
    makeItConfetti();
  } else if (winner === 'ia') {
    document.querySelector('body').classList.add('rainEffect');
    changeElement(dataIa.text, dataIa.pict);
    document.body.style.backgroundColor = "#696969";
  }
}

// activation de la fonction celebration lorsque la page html est chargé
window.addEventListener('DOMContentLoaded', () => {
  celebration();
})

