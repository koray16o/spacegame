const imagesCount = 3;
const enemyImages = [];
for (let i = 1; i < imagesCount; i++) {
  const img = new Image();
  enemyImages.push(img);
}

const enemyImage1 = new Image();
enemyImage1.src =
  'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/08/Space-Invaders-Monster.jpg';
const enemyImage2 = new Image();
enemyImage2.src =
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a5132fb6-4cea-4642-9fad-51d6cb8638e9/d4x3vwl-403b6214-1697-4c22-8862-4d7f89ae5ef6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E1MTMyZmI2LTRjZWEtNDY0Mi05ZmFkLTUxZDZjYjg2MzhlOVwvZDR4M3Z3bC00MDNiNjIxNC0xNjk3LTRjMjItODg2Mi00ZDdmODlhZTVlZjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.lalq1npPfrC4s8VslxFaVP_9wFoqa-QjpF5RwqO7pYo';
const enemyImage3 = new Image();
enemyImage3.src =
  'https://www.sciencealert.com/images/2023/01/AsteroidInSpaceWithStars.jpg';
enemyImages.push(enemyImage1, enemyImage2, enemyImage3);

const enemies = [];
class Enemy {
  constructor(x, y, w, h, speed, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.img = img;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  update() {
    this.x = this.x - this.speed;
  }
}

function animate() {
  requestAnimationFrame(animate);
  enemies.forEach(enemy => {
    enemy.draw();
    enemy.update();
    if (collisionWith(enemy)) {
      narrowPhase(enemy);
    }
  });
}

collisionWith = enemy => {
  return !(
    this.spaceship.y + this.spaceship.height < enemy.y ||
    this.spaceship.y > enemy.y + enemy.height ||
    this.spaceship.x + this.spaceship.width < enemy.x ||
    this.spaceship.x > enemy.x + enemy.width
  );
};

narrowPhase = enemy => {
  let spaceshipTop = Math.abs(spaceship.y - (enemy.y + enemy.height));
  let spaceshipRight = Math.abs(spaceship.x + spaceship.width - enemy.x);
  let spaceshipLeft = Math.abs(spaceship.x - (enemy.x + enemy.width));
  let spaceshipBottom = Math.abs(spaceship.y + spaceship.height - enemy.y);

  if (
    spaceship.y <= enemy.y + enemy.height &&
    spaceship.y + spaceship.height > enemy.y + enemy.height &&
    spaceshipTop < spaceshipRight &&
    spaceshipTop < spaceshipLeft
  ) {
    spaceshipLeft.y = enemy.y + enemy.height;
  }
  if (
    spaceship.y + spaceship.height >= enemy.y &&
    spaceship.y < enemy.y &&
    spaceshipBottom < spaceshipRight &&
    spaceshipBottom < spaceshipLeft
  ) {
    spaceship.y = enemy.y - spaceship.height;
  }
  if (
    spaceship.x + spaceship.width >= enemy.x &&
    spaceship.x < enemy.x &&
    spaceshipRight < spaceshipTop &&
    spaceshipRight < spaceshipBottom
  ) {
    spaceship.x = enemy.x - spaceship.width;
  }
  if (
    spaceship.x <= enemy.x + enemy.width &&
    spaceship.x + spaceship.width > enemy.x + enemy.width &&
    spaceshipLeft < spaceshipTop &&
    spaceshipLeft < spaceshipBottom
  ) {
    spaceship.x = enemy.x + enemy.width;
  }
};

animate();
