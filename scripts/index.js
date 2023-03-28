console.log('JS Loaded');

const canvas = document.getElementById('spaceGame');
const ctx = canvas.getContext('2d');

let audio = new Audio('../images/ES_Laser Gun Fire 5 - SFX Producer.mp3');

const spaceship = new Spaceship();

const game = new Game(spaceship);

function start() {
  document.getElementById('startMenu').style.display = 'none';
  game.start();
}

let background;
const backgroundImage = new Image();
backgroundImage.src =
  'https://cdn.mos.cms.futurecdn.net/HuGGeENt6kGyixe3hT9tnY-1200-80.jpg.webp';

backgroundImage.addEventListener('load', () => {
  background = new Background(backgroundImage);
});

document.addEventListener('keydown', event => {
  event.preventDefault();
  switch (event.key) {
    case 'ArrowUp':
      spaceship.speedY -= 1;
      break;
    case 'ArrowDown':
      spaceship.speedY += 1;
      break;
    case 'ArrowLeft':
      spaceship.speedX -= 1;
      break;
    case 'ArrowRight':
      spaceship.speedX += 1;
      break;
    case ' ':
      spaceship.shoot();
      audio.play();

      break;
  }
});

document.addEventListener('keyup', () => {
  spaceship.speedX = 0;
  spaceship.speedY = 0;
});
