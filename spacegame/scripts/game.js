class Game {
  constructor(spaceship) {
    this.spaceship = spaceship;
    this.interval = undefined;
    this.frames = 0;
    this.enemies = [];
  }

  start = () => {
    this.interval = setInterval(this.updateGameArea, 20);
  };

  stop = () => {
    clearInterval(this.interval);
  };
  clear = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  };

  score = () => {
    this.frames += 1;
    const points = Math.floor(this.frames / 15);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Score: ${points}`, 200, 50);
  };

  health = () => {
    const lives = 3;
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Lives: ${lives}`, 600, 50);
  };

  updateGameArea = () => {
    this.clear();
    background.updateBackground();
    this.spaceship.move();
    this.spaceship.draw();
    this.spaceship.moveBullets();
    this.score();
    this.health();
    this.spawnEnemies();
    this.enemies.forEach(enemy => {
      enemy.draw();
      enemy.update();
      this.spaceship.bullets.forEach(bullet => {
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          this.spaceship.bullets.splice(
            this.spaceship.bullets.indexOf(bullet),
            1
          );
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      });
    });

    this.checkGameOver(this.spaceship);
  };

  spawnEnemies = () => {
    if (Math.random() > 0.99) {
      const enemyImage =
        enemyImages[Math.floor(Math.random() * enemyImages.length)];
      const enemy = new Enemy(
        canvas.clientWidth,
        Math.random() * canvas.clientHeight,
        70,
        50,
        1,
        enemyImage
      );
      this.enemies.push(enemy);
    }
  };

  checkGameOver = spaceship => {
    const crashed = this.enemies.some(enemy => {
      return enemy.collisionWith(spaceship);
    });

    if (crashed) {
      this.stop();
      console.log(crashed);
      console.log(this.spaceship);
      console.log(this.enemies);
    }
  };
}
