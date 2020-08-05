class SnakeMap {
    constructor(){
        //1创建div
        let oDiv = document.createElement('div');
        //2设置class
        oDiv.className = 'snakeMap'
        //div置入到body
        document.body.appendChild(oDiv);
        this.oMap = oDiv;
    }
}