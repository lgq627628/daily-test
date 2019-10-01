import Tool from './Tool'
import element from './element.js';
class Food {
  constructor(options = {}) {
    this.map = options.map || {}
    this.nowEle = options.nowEle
    this.otherElement = element.filter(ele => ele.number !== this.nowEle.number);
    this.width = options.width || 40
    this.height = options.height || 40
    this.position = 'absolute'
    this.x = 0
    this.y = 0
    this.foods = []
    this.id = 0
    this.createFood()
  }

  render() {
    this.foods.forEach(food => {
      if (food.div) {
        food.div.style.left = food.x * this.width + 'px'
        food.div.style.top = food.y * this.height + 'px'
        food.div.innerHTML = food.content
      } else {
        food.div = document.createElement('div')
        food.div.style.width = this.width + 'px'
        food.div.style.height = this.height + 'px'
        food.div.style.backgroundColor = food.color
        food.div.innerHTML = food.content
        food.div.style.position = this.position
        food.div.style.display = 'flex';
        food.div.style.alignItems = 'center';
        food.div.style.justifyContent = 'center';
        food.div.style.position = this.position
        food.div.style.left = food.x * this.width + 'px'
        food.div.style.top = food.y * this.height + 'px'
        food.div.style.zIndex = food.color === 'green' ? 2 : 1;

        this.map._map.appendChild(food.div)
      }
    })
  }

  createFood() {
    this.createTrueAnswer();
    this.createFalseAnswer();
  }

  createTrueAnswer() {
    Object.keys(this.nowEle).forEach(key => {
      this.foods.push({
        x: Tool.getRandom(0, this.map.width / this.width - 1),
        y: Tool.getRandom(0, this.map.height / this.height - 1),
        content: this.nowEle[key],
        number: this.nowEle.number,
        div: null,
        id: this.id,
        color: 'green'
      })
      this.id++
    })
  }

  createFalseAnswer() {
    let num = Math.random() > 0.5 ? 2 : 3
    let idx = Tool.getRandom(0, this.otherElement.length - num);
    let otherElement = this.otherElement.slice(idx, idx + num)
    otherElement.forEach(other => {
      Object.keys(other).forEach(key => {
        this.foods.push({
          x: Tool.getRandom(0, this.map.width / this.width - 1),
          y: Tool.getRandom(0, this.map.height / this.height - 1),
          content: other[key],
          number: other.number,
          div: null,
          id: this.id,
          color: 'red'
        })
        this.id++
        if (this.foods.length > 10) return;
      })
    })
  }

  removeFood(food) {
    let idx = this.foods.findIndex(item => item.id === food.id)
    this.map._map.removeChild(food.div)
    this.foods.splice(idx, 1)
  }

  removeAllFood() {
    this.foods.forEach(food => {
      this.map._map.removeChild(food.div)
    })
    this.foods = []
  }
}

export default Food
