class Food {
  constructor() {
    this.pos = null;
  }
  create() {
    if (this.pos) {
      this.handleDot(false, this.pos, 'food');
    }
    let isOk = true;
    while (isOk) {
      let x = parseInt(Math.random() * settings.pannelSize),
        y = parseInt(Math.random() * settings.pannelSize);
      if (!$('.td_' + x + '_' + y).hasClass('body')) {
        isOk = false;
        let pos = new Position(x, y);
        this.handleDot(true, pos, 'food');
        this.pos = pos;
      }
    }
  }
  draw(flag, dot, className) {
    // 方便我们统一处理坐标点的样式
    if (flag) {
      $('.td_' + dot.X + '_' + dot.Y).addClass(className);
    } else {
      $('.td_' + dot.X + '_' + dot.Y).removeClass(className);
    }
  }
}
