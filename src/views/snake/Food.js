import Tool from './Tool'
class Food {
  constructor(options = {}) {
    this.map = options.map || {}
    this.width = options.width || 40
    this.height = options.height || 40
    this.color = options.color || 'green'
    this.position = 'absolute'
    this.x = 0
    this.y = 0
    this._food = null
  }
  render() {
    this.createPos()
    if (this._food) {
      this._food.style.left = this.x * this.width + 'px'
      this._food.style.top = this.y * this.height + 'px'
    } else {
      this._food = document.createElement('div')
      this._food.style.width = this.width + 'px'
      this._food.style.height = this.height + 'px'
      this._food.style.backgroundColor = this.color
      this._food.style.position = this.position
      this._food.style.left = this.x * this.width + 'px'
      this._food.style.top = this.y * this.height + 'px'
      this.map._map.appendChild(this._food)
    }
  }
  createPos() {
    this.x = Tool.getRandom(0, this.map.width / this.width - 1)
    this.y = Tool.getRandom(0, this.map.height / this.height - 1)
  }

}

export default Food
