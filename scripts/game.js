class Game {
  constructor(spaceship) {
    this.spaceship = spaceship;
    this.interval = undefined;
    this.frames = 0;
    this.points = 0;
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
    let shownScore = Math.floor(this.frames / 15);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Score: ${shownScore}`, 200, 50);
    if (this.checkShootEnemies === true) {
    }
  };

  health = () => {
    const lives = 1;
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Lives: ${lives}`, 600, 50);
    if (this.checkGameOver === true) {
      lives - 1;
    }
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
    });
    this.checkShootEnemies();
    this.checkGameOver(this.spaceship);
  };

  spawnEnemies = () => {
    if (Math.random() > 0.99) {
      const enemyImage =
        enemyImages[Math.floor(Math.random() * enemyImages.length)];
      const enemy = new Enemy(
        canvas.clientWidth,
        Math.floor(Math.random() * canvas.clientHeight),
        60,
        50,
        1.8,
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
      ctx.font = '50px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('Game Over', 400, 350);

      let btn = document.createElement('button');
      btn.innerHTML = 'Restart';
      btn.addEventListener('click', () => {
        location.reload();
      });
      document.body.appendChild(btn);
    }
  };

  checkShootEnemies = () => {
    let collided;
    this.enemies.some(enemy => {
      this.spaceship.bullets.some(bullet => {
        if (bullet.collisionWith(enemy)) {
          this.spaceship.bullets.splice(
            this.spaceship.bullets.indexOf(bullet),
            1
          );
          collided = true;
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      });
    });
    if (collided) {
      this.frames += 750;
    }
  };
}
