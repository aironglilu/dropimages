let imgWidth=100;
let imgheight=100;
window.onload=(function(){
    setTimeout(() => {
        loading();    
    }, 500);
    
});

class DragImageEntity {

    constructor(image,x,y) {
      //横坐标
      this.x = x;
      //纵坐标
      this.y = y;
      this.img=image;
      this.orderBy=0;
      
    }
}
var images=[];
var img = new Image();
img.src = "visual_02.jpg";
images.push(new DragImageEntity(img,0,0));
var img1 = new Image();
img1.src = "tuceng1.jpg";
images.push(new DragImageEntity(img1,100,100));
images.push(new DragImageEntity(img1,100,100));
var img2 = new Image();
img2.src = "rain-sparkles-on-tree.jpg";
images.push(new DragImageEntity(img2,100,100));
images.push(new DragImageEntity(img2,100,100));
var img3 = new Image();
img3.src = "sunlight-through-raindrops-on-tree.jpg";
images.push(new DragImageEntity(img3,100,100));
images.push(new DragImageEntity(img3,100,100));
var img4 = new Image();
img4.src = "Sun-Shining-Through-Forest.jpg";
images.push(new DragImageEntity(img4,100,100));
images.push(new DragImageEntity(img4,100,100));



  function GetImage(x,y){
      for (let index = 0; index < images.length; index++) {
          const item = images[index];
          if(x>=item.x&&x<=item.x+imgWidth&&y>=item.y&&y<=item.y+imgheight){
              return item;
          }
      }
      return false;

  }


function loading(){
        
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");     
        

        var moveFlag = false;
        var clickFlag = false;
        
        

        canvas.onmousedown=function(e){
            var image= GetImage(e.layerX,e.layerY);            
             if(!image)return; 
            moveFlag = true;
            clickFlag = true;
            
            let lastX=e.layerX;
            let lastY=e.layerY;
             canvas.onmousemove = function (e1) {
                clickFlag = false;
                if (moveFlag) {                                     
                    image.x = image.x+ e1.layerX-lastX;
                    lastX=e1.layerX;
                    image.y = image.y+e1.layerY-lastY;                    
                    lastY=e1.layerY;
                
                    //判断是否超出边界
                    if (image.x<0) {                        
                        image.x = 0;
                        over();
                        return;
                    }
                    if (image.x+imgWidth>canvas.width) {                        
                        image.x = canvas.width - imgWidth;
                        over();
                        return;
                    }
                    if (image.y<0) {                        
                        image.y = 0;
                        over();
                        return;
                    }
                    if (image.y+imgheight>canvas.height) {                        
                        image.y = canvas.height- imgheight;
                        over();
                        return;
                    }                    
                    drawImg(image);
                    window.onmouseup = function () {
                        moveFlag = false;
                        sortImg();
                    }
                    function over(){
                        moveFlag = false;
                        sortImg();
                    }

                }
            }
        }       

        
        drawImg()   
        function drawImg() {
            ctx.clearRect(0, 0, 500, 400);
            for (let index = 0; index < images.length; index++) {
                const item = images[index];
                ctx.drawImage(item.img, item.x, item.y,imgWidth,imgheight);
            }
            ctx.stroke();
        }
        function sortImg(){
           var imgCount= images.length;
          var tempimages= images.slice();
            for (let index = 0; index < imgCount; index++) {
                let x= (index%4)*(imgWidth+10)+10;
                let y= (parseInt(index/4))*(imgheight+10)+10;
                let item;
                for (let j = 0; j < tempimages.length; j++) {
                    const tempItem = tempimages[j];
                    if(item==null){
                        item=tempItem;
                        continue;
                    }
                    //(tempItem.y-item.y)/imgheight
                   let additional= parseInt((tempItem.y-item.y)/imgheight)*4;
                   if(additional*(imgWidth+10)+tempItem.x<item.x){
                   item= tempItem;
                   }                    
                }
                item.x=x;
                item.y=y;
                item.orderBy=index;
                tempimages.forEach(function(tempitem, index, arr) {
                    if(tempitem == item) {
                        arr.splice(index, 1);
                    }
                });
            }
            drawImg();
        }
    }