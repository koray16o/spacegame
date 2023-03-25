console.log('JS Loaded');

const canvas = document.getElementById('spaceGame');
const ctx = canvas.getContext('2d');

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
  if (event.code === 'Space') {
    spaceship.shoot();
  }

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
  }
});

document.addEventListener('keyup', () => {
  spaceship.speedX = 0;
  spaceship.speedY = 0;
});
