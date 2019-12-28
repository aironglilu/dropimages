if(jQuery){
    (function ($){        
              
        $.fn.znImagesDrag=function(optiins) {            
            var defaultoptiins={
                imgWidth:100,
                imgheight:100,
                row:4,//一排放几个
            };  

            var imagesDragContainer;
            var znImagesDragEntity;
            if(this.length>0){
                imagesDragContainer=this[0]                
            }else{
                return null;
            }
            if(imagesDragContainer.tagName!=="CANVAS")return null;
            if(!imagesDragContainer.wzDragImagesEntity){
                optiins=$.extend(defaultoptiins,optiins);            
             var wzDragImagesEntity=new WzDragImagesEntity(imagesDragContainer,optiins)

                imagesDragContainer.wzDragImagesEntity=wzDragImagesEntity;                
            }
           return imagesDragContainer.wzDragImagesEntity;
            

        }
        class WzDragImagesEntity{
            constructor(canvarContainer,optiins){
                this.canvarContainer=canvarContainer;
                this.optiins=optiins;
                this.initialize();
            }
            images=[];
            initialize() {
                this.canvarCtx=this.canvarContainer.getContext("2d");
                var moveFlag = false;
                var clickFlag = false;
                var that=this;
                this.canvarContainer.onmousedown=function(e){
                    var image= that.getImage(e.layerX,e.layerY);            
                     if(!image)return; 
                    moveFlag = true;
                    clickFlag = true;
                    
                    let lastX=e.layerX;
                    let lastY=e.layerY;
                    that.canvarContainer.onmousemove = function (e1) {
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
                            if (image.x+that.optiins.imgWidth>that.canvarContainer.width) {                        
                                image.x = that.canvarContainer.width - that.optiins.imgWidth;
                                over();
                                return;
                            }
                            if (image.y<0) {                        
                                image.y = 0;
                                over();
                                return;
                            }
                            if (image.y+that.optiins.imgheight>that.canvarContainer.height) {                        
                                image.y = that.canvarContainer.height- that.optiins.imgheight;
                                over();
                                return;
                            }                    
                            that.drawImg(image);
                            window.onmouseup = function () {
                                moveFlag = false;
                                that.sortImg();
                                window.onmouseup=null;
                            }
                            function over(){
                                moveFlag = false;
                                that.sortImg();
                            }
        
                        }
                    }
                }      
            }
            getImage(x,y){
                for (let index = 0; index < this.images.length; index++) {
                    const item = this.images[index];
                    if(x>=item.x&&x<=item.x+this.optiins.imgWidth&&y>=item.y&&y<=item.y+this.optiins.imgheight){
                        return item;
                    }
                }
                return false;
            }
            drawImg() {
                this.canvarCtx.clearRect(0, 0, 500, 400);
                for (let index = 0; index < this.images.length; index++) {
                    const item = this.images[index];
                    this.canvarCtx.drawImage(item.img, item.x, item.y,this.optiins.imgWidth,this.optiins.imgheight);
                }
                this.canvarCtx.stroke();
            }
            sortImg(){
                var imgCount= this.images.length;
                var tempimages= this.images.slice();
                  for (let index = 0; index < imgCount; index++) {
                      let x= (index%this.optiins.row)*(this.optiins.imgWidth+10)+10;
                      let y= (parseInt(index/this.optiins.row))*(this.optiins.imgheight+10)+10;
                      let item;
                      for (let j = 0; j < tempimages.length; j++) {
                          const tempItem = tempimages[j];
                          if(item==null){
                              item=tempItem;
                              continue;
                          }
                          //(tempItem.y-item.y)/imgheight
                         let additional= parseInt((tempItem.y-item.y)/this.optiins.imgheight)*this.optiins.row;
                         if(additional*(this.optiins.imgWidth+10)+tempItem.x<item.x){
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
                  this.drawImg();
            }
            addImg(image){
               var imgEntity=  new WzDragImageEntity(image,this.optiins.imgWidth*this.optiins.row,this.optiins.imgheight*this.optiins.col)
               this.images.push(imgEntity);
               this.sortImg();
            }
        
        }
        class WzDragImageEntity {
        
            constructor(image,x,y) {
              //横坐标
              this.x = x;
              //纵坐标
              this.y = y;
              this.img=image;
              this.orderBy=0;
              
            }
        }        
    })(window.jQuery);
}

