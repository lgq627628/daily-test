const TOOL = {
  //获取[min - max)之间的随机整数
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
export default TOOL