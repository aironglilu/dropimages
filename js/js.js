$(function(){
   var wzDragImagesEntity= $('#myCanvas').znImagesDrag({row:3});

    $("#input").change(function(){
        //var file = this.files[0];//获取input输入的图片
        if(this.files)
        for (let index = 0; index < this.files.length; index++) {
            const file  = this.files[index];
            if(!/image\/\w+/.test(file.type)){
                alert("请确保文件为图像类型");
                return false;
            }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
            var reader = new FileReader();
            reader.readAsDataURL(file);//转化成base64数据类型
            reader.onload = function(e){
                var img = new Image;
                img.src = this.result;
                img.onload = function(){//必须onload之后再画
                    wzDragImagesEntity.addImg(img) ;                
                }
                
                    //drawToCanvas(this.result);
                }
            
        }
       
        
    })
})