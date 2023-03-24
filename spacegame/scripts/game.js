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
    Spaceship.prototype.moveBullets = function () {
      for (let i = 0; i < this.bullets.length; i++) {
        const bullet = this.bullets[i];
        bullet.move();
        if (bullet.y < 0) {
          this.bullets.splice(i, 1);
          i--;
        }
      }
    };
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

    this.checkGameOver();
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

  animate() {
    requestAnimationFrame(animate);
    enemies.forEach(enemy => {
      enemy.draw();
      enemy.update();
      if (collisionWith(enemy)) {
        narrowPhase(enemy);
      }
    });
  }

  checkGameOver = () => {
    const crashed = this.enemies.some(enemy => {
      return this.spaceship.collisionWith(enemy);
    });

    if (crashed) {
      this.stop();
    }

    /* if (this.lives === 0) {
       this.stop();
    }*/
  };
  collisionWith = enemy => {
    return !(
      this.spaceship.y + this.spaceship.height < enemy.y ||
      this.spaceship.y > enemy.y + enemy.height ||
      this.spaceship.x + this.spaceship.width < enemy.x ||
      this.spaceship.x > enemy.x + enemy.width
    );
  };
}
