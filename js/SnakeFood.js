class SnakeFood{
    constructor(width,height,img,snakeMap){
        this.width = width;
        this.height = height;
        this.img = img;
        this.snakeMap = snakeMap;
        //拿到地图宽高
        let snakeMapElement = getComputedStyle(this.snakeMap.oMap)
        let widthS = parseInt(snakeMapElement.width);
        let heightS = parseInt(snakeMapElement.height);
        //计算col和row
        this.colMath = widthS / this.width -1;
        this.rowMath = heightS / this.height - 1;
    }
    // 定义render方法
    render() {
        //创建div
        this.oDiv = document.createElement("div");
        //设置div样式
        this.oDiv.style.width = this.width + 'px';
        this.oDiv.style.height = this.height + 'px';
        this.oDiv.style.background = `url(${this.img})`;
        this.oDiv.style.position = 'absolute'
        //添加到对应对象中
        this.snakeMap.oMap.appendChild(this.oDiv);
        let {x,y} = this.getMap();
        this.x = x;
        this.y = y;
        this.oDiv.style.left = x * this.width + 'px';
        this.oDiv.style.top = y*this.height +'px';        
    }
    deleteFood(){
        this.oDiv.parentNode.removeChild(this.oDiv)
    }
    getMap(){
        //计算出一个随机数
        let colRandom = getRandomIntInclusive(0,this.colMath)
        let rowRandom =  getRandomIntInclusive(0,this.rowMath)
        return {x:colRandom,y:rowRandom}
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }