const imagesCount = 0;
const enemyImages = [];
for (let i = 1; i < imagesCount; i++) {
  const img = new Image();
  enemyImages.push(img);
}

const enemyImage1 = new Image();
enemyImage1.src = '../images/monster-good.png';
const enemyImage2 = new Image();
enemyImage2.src = '../images/asteroid-good.png';
const enemyImage3 = new Image();
enemyImage3.src = '../images/monster-2.png';
enemyImages.push(enemyImage1, enemyImage2, enemyImage3);

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

  //Left border is at x position
  left = () => {
    return this.x;
  };

  //Right border is the x position + the width of the element
  right = () => {
    return this.x + this.w;
  };
  //Top border is on the Y position
  top = () => {
    return this.y;
  };

  //Bottom border is at Y position plus the height of the element
  bottom = () => {
    return this.y + this.h;
  };

  collisionWith = player => {
    // we will check if they hit

    return !(
      this.bottom() < player.top() ||
      this.top() > player.bottom() ||
      this.right() < player.left() ||
      this.left() > player.right()
    );
  };
}
