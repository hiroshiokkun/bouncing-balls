const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //描画するためのcntext

const width = (canvas.width = window.innerWidth); //ブラウザのビューポートの幅と高さ　ページ表示の領域
const height = (canvas.height = window.innerHeight);

//random()で2つの引数をとりその間の範囲を乱数で返します。
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ballクラスのconstructorで初期化
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  draw() {
    ctx.beginPath(); //紙に形を書きたいと宣言する。
    ctx.fillStyle = this.color; //このクラスBallの色何色にしますか？
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //次に arc() メソッドを使って紙に円弧形をなぞります/
    ctx.fill(); //最後の最後に、fill() (en-US) メソッドを使って、これはおおよそ、「beginPath() から描き始めた線描を終了し、描いた領域を前に fillStyle で指定していた色で塗り潰せ」という指示になります。
  }
  //関数の頭から 4 つの部分でボールがキャンバスの端に達したかどうかチェックします。もしそうであれば、関連する速度の向きを反転してボールが反対の向きに移動するようにします。つまり例えば、ボールが上方向に移動していた（velY が負）ならば、垂直方向の速度をボールが下方向に移動するように（velY を正に）変更します。
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}
const testBall = new Ball(50, 100, 4, 4, "blue", 10);
testBall.x;
testBall.size;
testBall.color;
testBall.draw();

const balls = [];
while (balls.length < 50) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}
loop();
