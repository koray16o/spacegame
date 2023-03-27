class Spaceship {
  constructor() {
    this.x = 500;
    this.y = 350;
    this.loaded = false;
    this.speedX = 0;
    this.speedY = 0;
    this.bullets = [];
    this.width = 100;
    this.height = 100;

    const img = new Image();
    img,
      addEventListener('load', () => {
        this.loaded = true;
        this.img = img;
        this.draw();
      });

    img.src = '../images/spaceship-good.png';
  }

  move = () => {
    this.x += this.speedX;
    this.y += this.speedY;
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }
  };

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.bullets.forEach(bullet => bullet.draw());
  }

  //Left border is at x position
  left = () => {
    return this.x;
  };

  //Right border is the x position + the width of the element
  right = () => {
    return this.x + this.width;
  };
  //Top border is on the Y position
  top = () => {
    return this.y;
  };

  //Bottom border is at Y position plus the height of the element
  bottom = () => {
    return this.y + this.height;
  };

  shoot = () => {
    const bullet = new Bullet(this.x + 50, this.y + 40);
    this.bullets.push(bullet);
  };

  moveBullets = () => {
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.move();
      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
        i--;
      }
    }
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

  //Left border is at x position
  left = () => {
    return this.x;
  };

  //Right border is the x position + the width of the element
  right = () => {
    return this.x + this.width;
  };
  //Top border is on the Y position
  top = () => {
    return this.y;
  };

  //Bottom border is at Y position plus the height of the element
  bottom = () => {
    return this.y + this.height;
  };

  collisionWith = enemy => {
    // we will check if they hit

    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  };
}
