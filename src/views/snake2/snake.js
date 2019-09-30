import DIRECTION from './gameConfig'
class Snake {
  constructor(food) {
    this.direction = DIRECTION.RIGHT
    this.body = []
    this.food = food
  }
  Create() {
    let isOk = true;
    while (isOk) {
      let x = parseInt(Math.random() * (settings.pannelSize - 2)) + 1,
        y = parseInt(Math.random() * (settings.pannelSize - 2)) + 1;
      console.log(x, y)
      if (!$('.td_' + x + '_' + y).hasClass('food')) {
        isOk = false;
        let pos = new Position(x, y);
        this.handleDot(true, pos, 'body')
        this.body.push(pos);
      }
    }
  }
  handleDot(flag, dot, className) {
    if (flag) {
      $('.td_' + dot.X + '_' + dot.Y).addClass(className);
    } else {
      $('.td_' + dot.X + '_' + dot.Y).removeClass(className);
    }
  }
  Move() {
    let oldHead = Object.assign(new Position(), this.body[0]),
      oldTail = Object.assign(new Position(), this.body[this.body.length - 1]),
      newHead = Object.assign(new Position(), oldHead);
    switch (this.dir) {
      case Direction.UP:
        newHead.X = newHead.X - 1;
        break;
      case Direction.DOWN:
        newHead.X = newHead.X + 1;
        break;
      case Direction.LEFT:
        newHead.Y = newHead.Y - 1;
        break;
      case Direction.RIGHT:
        newHead.Y = newHead.Y + 1;
        break;
      default:
        break;
    }
    // 数组添头
    this.body.unshift(newHead);
    // 数组去尾
    this.body.pop();


    if (this.eatFood()) {
      this.body.push(oldTail);
      this.food.Create();
      this.rePaint(true, newHead, oldTail);
    } else if (this.konckWall() || this.konckBody()) {
      this.Over();
    } else {
      this.rePaint(false, newHead, oldTail);
    }
  };
  Over() {
    clearInterval(settings.workThread);
    console.log('Game Over');
  };
  rePaint(isEatFood, newHead, oldTail) {
    if (isEatFood) {
      // 加头
      this.handleDot(true, newHead, 'body');
    } else {
      // 加头
      this.handleDot(true, newHead, 'body');
      // 去尾
      this.handleDot(false, oldTail, 'body');
    }
  }
  // 食物检测
  eatFood() {
    let newHead = this.body[0];
    if (newHead.X == this.food.pos.X && newHead.Y == this.food.pos.Y) {
      return true;
    } else {
      return false;
    }
  };
  // 边界检测
  konckWall() {
    let newHead = this.body[0];
    if (newHead.X == -1 ||
      newHead.Y == -1 ||
      newHead.X == settings.pannelSize ||
      newHead.Y == settings.pannelSize) {
      return true;
    } else {
      return false;
    }
  }
  // 蛇身检测
  konckBody() {
    let newHead = this.body[0],
      flag = false;
    this.body.map(function (elem, index) {
      if (index == 0)
        return;
      if (elem.X == newHead.X && elem.Y == newHead.Y) {
        flag = true;
      }
    });
    return flag;
  }
}
