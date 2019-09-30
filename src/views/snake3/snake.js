class Snake {
  constructor(options = {}) {
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.body = [{
        x: 3,
        y: 2,
        color: 'green'
      },
      {
        x: 2,
        y: 2,
        color: 'orange'
      },
      {
        x: 1,
        y: 2,
        color: 'orange'
      }
    ];
    this.direction = option.direction || 'right';
    this.map = options.map
  }
  render() {
    for (var i = 0; i < arr.length; i++) {
      map.removeChild(arr[i]);
    }
    arr.splice(0, arr.length);

    this.body.forEach(function (item, index) {
      var snakeNode = document.createElement('div');
      arr.push(snakeNode);
      snakeNode.style.width = this.width + 'px';
      snakeNode.style.height = this.height + 'px';
      snakeNode.style.position = 'absolute';
      snakeNode.style.left = item.x * this.width + 'px';
      snakeNode.style.top = item.y * this.height + 'px';
      snakeNode.style.backgroundColor = item.col;
      map.appendChild(snakeNode);

    })
  }
}
