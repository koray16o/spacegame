class Spaceship {
  constructor() {
    this.x = 500;
    this.y = 350;
    this.loaded = false;
    this.speedX = 0;
    this.speedY = 0;
    this.bullets = [];

    const img = new Image();
    img,
      addEventListener('load', () => {
        this.loaded = true;
        this.img = img;
        this.draw();
      });

    img.src = 'http://www.clipartbest.com/cliparts/nTE/KoE/nTEKoE8TA.gif';
  }

  move = () => {
    this.x += this.speedX;
    this.y += this.speedY;
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }
  };

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 100, 100);
    this.bullets.forEach(bullet => bullet.draw());
  }

  collisionWith = enemy => {
    const shipLeft = this.x;
    const shipRight = this.x + this.width;
    const shipTop = this.y;
    const shipBottom = this.y + this.height;

    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.width;
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.height;

    return (
      shipLeft < enemyRight &&
      shipRight > enemyLeft &&
      shipTop < enemyBottom &&
      shipBottom > enemyTop
    );
  };

  shoot = () => {
    const bullet = new Bullet(this.x + 50, this.y + 40);
    this.bullets.push(bullet);
  };
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 5;
    this.speed = 5;
  }

  move = () => {
    this.x += this.speed;
  };

  draw = () => {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}
