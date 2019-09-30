class Control {
  constructor() {
    this.snake = null;
    this.init();
  }
  init() {
    this.bindClick();
    setPannel(settings.pannelSize);
  }
  startGame() {
    var food = new Food();
    food.Create();
    var snake = new Snake(food);
    snake.Create();
    this.snake = snake;
    settings.workThread = setInterval(function () {
      snake.Move();
    }, settings.speed);
  }

}
