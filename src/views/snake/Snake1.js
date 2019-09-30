import Tool from './Tool'
class Snake {
  constructor(options = {}) {
    this.map = options.map || {}
    this.food = options.food || {}
    this.width = options.width || 40
    this.height = options.height || 40
    this.position = 'absolute'
    this.direction = 'right'
    this.body = [{
        x: 3,
        y: 2,
        color: 'red',
        div: null
      },
      {
        x: 2,
        y: 2,
        color: 'blue',
        div: null
      },
      {
        x: 1,
        y: 2,
        color: 'blue',
        div: null
      }
    ]
    this.maxX = this.map.width / this.width - 1
    this.maxY = this.map.height / this.height - 1
  }
  render() {
    this.body.forEach(item => {
      if (item.div) {
        item.div.style.left = item.x * this.width + 'px'
        item.div.style.top = item.y * this.height + 'px'
      } else {
        item.div = document.createElement('div')
        item.div.style.width = this.width + 'px'
        item.div.style.height = this.height + 'px'
        item.div.style.backgroundColor = item.color
        item.div.style.position = this.position
        item.div.style.left = item.x * this.width + 'px'
        item.div.style.top = item.y * this.height + 'px'
        this.map._map.appendChild(item.div)
      }
    })
  }

  move() {
    if (this.body[0].x === this.food.x && this.body[0].y === this.food.y) {
      this.body.push({
        x: 0,
        y: 0,
        color: 'blue',
        div: null
      })
      this.food.render()
    }
    // 移动蛇身
    for (let len = this.body.length, i = len - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    // 移动蛇头
    if (this.direction === 'right') {
      this.body[0].x += 1
    } else if (this.direction === 'left') {
      this.body[0].x -= 1
    } else if (this.direction === 'up') {
      this.body[0].y -= 1
    } else if (this.direction === 'down') {
      this.body[0].y += 1
    }
    if (this.body[0].x > this.maxX) {
      this.body[0].x = 0
    } else if (this.body[0].x < 0) {
      this.body[0].x = this.maxX
    } else if (this.body[0].y > this.maxY) {
      this.body[0].y = 0
    } else if (this.body[0].y < 0) {
      this.body[0].y = this.maxY
    }
    // 重新渲染
    this.render()
  }

  setDirection(direction) {
    if (this.direction === 'up' && (direction === 'up' || direction === 'down')) return
    if (this.direction === 'left' && (direction === 'left' || direction === 'right')) return
    if (this.direction === 'right' && (direction === 'right' || direction === 'left')) return
    if (this.direction === 'down' && (direction === 'down' || direction === 'up')) return
    this.direction = direction
  }

  pause() {

  }
}

export default Snake
