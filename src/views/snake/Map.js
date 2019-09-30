class Map {
  constructor(options = {}) {
    // 属性最好先用数值，后期方法执行后再加上单位
    this.width = options.width || 800
    this.height = options.height || 400
    this.color = options.color || 'lightblue'
    this.position = 'absolute'
    this._map = null
  }
  render() {
    this._map = document.createElement('div')
    this._map.style.width = this.width + 'px'
    this._map.style.height = this.height + 'px'
    this._map.style.backgroundColor = this.color
    this._map.style.position = this.position
    document.getElementById('hh').appendChild(this._map)
  }
}

export default Map
