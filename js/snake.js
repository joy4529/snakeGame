class Snake {
    constructor(obj){
        this.width = obj.width;
        this.height = obj.height;
        this.bodyImage = obj.bodyImage;
        this.headImage = obj.headImage;
        this.snakeMap = obj.snakeMap;
        this.body = [
            {x:2,y:1,type:2},
            {x:1,y:1,type:1},
            {x:0,y:1,type:1}
        ]
        //拿到地图宽高
        let snakeMapElement = getComputedStyle(this.snakeMap.oMap)
        let widthS = parseInt(snakeMapElement.width);
        let heightS = parseInt(snakeMapElement.height);
        //计算col和row
        this.colMath = widthS / this.width -1;
        this.rowMath = heightS / this.height - 1;
        //获取按键
        document.body.onkeydown = (event)=>{
            this.key = event.key;
        }
    }
    move(){
        for(let i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
            this.body[i].type = 1;
        }
        //修改蛇头位置
        let head = this.body[0];
        switch(this.key){
            case 'w' : //向上 y-1
                head.y = head.y -1;
                break
            case 's': //乡下
                head.y = head.y +1;
                break
            case 'a': // 向左
                head.x = head.x -1
                break               
            case 'd': //向右  
                head.x = head.x +1
                break
            default:
                head.x = head.x +1
                break
        }
    }
    inspection(){
        let head = this.body[0];
        //判断是否超出边界
        if(head.x<0 || head.y<0 || head.x >this.colMath || head.y > this.rowMath){
            alert('死了')
            clearInterval(this.timeout)
            return true;
        }
        //判断蛇头与食物是否重叠
        if(head.x ===snakeFood.x && head.y ===snakeFood.y){
            var snakeLength = this.body.length -1 
            let newBody = {x:this.body[snakeLength].x,y:this.body[snakeLength].y,type:1}
            switch(this.key){
                case 'w' : //向上 y-1
                newBody.y = newBody.y +1;
                    break
                case 's': //乡下
                newBody.y = newBody.y -1;
                    break
                case 'a': // 向左
                newBody.x = newBody.x +1
                    break               
                case 'd': //向右  
                newBody.x = newBody.x -1
                    break
                default:
                    newBody.x = newBody.x -1
                    break
            }
            this.body.push(newBody)
            snakeFood.deleteFood()
            snakeFood.render()
        }
        //判断蛇头与蛇身是否重合
        for(let i =1 ; i<this.body.length-1;i++){
            
        }
    }
    updata(snakeFood){
        //修改蛇身位置
        // for(let i = 0 ; i <this.body.length-1 ; i++){
        //     this.body[i].x = this.body[i+1].x;
        //     this.body[i].y = this.body[i+1].y;
        // }
        this.timeout = setInterval(()=>{
            //让蛇动起来
            this.move();
            //判断是否超出边界;
            let flag = this.inspection(snakeFood);
            
            if(flag){
                return
            }
            //重新渲染
            this.render()
            
        },500)
        
    }
    render() {
        //删除全部蛇
        let allSnake = document.querySelectorAll('.snake');
        for(let i = allSnake.length-1;i>=0;i--){
            let oDiv = allSnake[i];
            oDiv.parentNode.removeChild(oDiv);
        }
        //创建蛇对象div
        for(let value of this.body){
            let oDiv = document.createElement("div");
            //设置蛇的样式
            oDiv.style.width = this.width + 'px';
            oDiv.style.height = this.height + 'px';
            oDiv.className = 'snake';
            if(value.type === 2){
                oDiv.style.background = `url(${this.headImage})`
            }else{
                oDiv.style.background = `url(${this.bodyImage})`
            }
            //确定蛇的位置
            oDiv.style.position = "absolute";
            oDiv.style.left = value.x * this.width +"px";
            oDiv.style.top = value.y * this.height + "px";
            //将蛇对象放到地图中
            this.snakeMap.oMap.appendChild(oDiv);
        }        
    }
}