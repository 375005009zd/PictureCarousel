window.onload=function(){
    var carousel = new Carousel('.poster');
   
};

function Carousel(el){
  
    this._initCarousel(el);
   


}

Carousel.prototype={
    _option:{
        width: 800,
        height: 270,
        posterHeihgt: 270,
        posterWidth: 690,
        speed: 400,
        verticalAlgin: "middle"
    },
    //初始化图片轮播
    _initCarousel:function(dom){
         var that = this;
         this._wrapper = document.querySelectorAll(dom);

         Array.prototype.forEach.call(this._wrapper,function(v){
             //获取参数设置
            var opt =JSON.parse( v.getAttribute('data-option'));
            Object.assign(that._option,opt);
            that._setPicturePos(that._option,v);
         });
    },
    _setPicturePos: function(opts,target){
        var that = this;
        this.liElements = target.querySelectorAll('.poster-itmes li');
        this.leftBtn = target.querySelector('.btn-prev');
        this.rightBtn = target.querySelector('.btn-next');
        this.countNum = this.liElements.length;

        target.style ='width:' + opts.width + 'px;' + 'height:' + opts.height + 'px;';
        //设置按钮的宽高
        var btnWidth = (opts.width - opts.posterWidth)/2;
        this.leftBtn.style ='width:' + btnWidth + 'px;' + 'height:' + opts.height + 'px;' + 'z-index:' + (this.countNum + 1);
        this.rightBtn.style ='width:' + btnWidth + 'px;' + 'height:' + opts.height + 'px;' + 'z-index:' + (this.countNum + 1);

         this.firstEl = this.liElements[0];
         this.lastEl = this.liElements[this.countNum-1];
        //设置第一张图片的位置
        this.firstEl.style ='width:' + opts.posterWidth + 'px;' + 'height:' + opts.posterHeihgt + 'px;' + 'left:' + btnWidth + 'px;' + 'z-index:' + (this.countNum + 1) + ';opacity:1';

        //图片平均分布在两侧
        var picHalfNum = Math.floor(this.countNum/2);
        var rightElements = Array.prototype.slice.call(this.liElements,1,picHalfNum+1);
        var leftElements = Array.prototype.slice.call(this.liElements,picHalfNum+1 ,this.countNum);
        var rlevel = picHalfNum;

        //设置右侧图片位置
        var gapWidth = btnWidth/picHalfNum;
        var rw = opts.posterWidth,rh = opts.posterHeihgt,i=0,opacityVal =1;
        rightElements.forEach(function(v){
          
             i++;
             rw = rw * opts.scale;
             rh = rh * opts.scale;
             opacityVal = opacityVal * opts.scale;
             
             v.style.width = rw + 'px';
             v.style.height = rh + 'px';
             v.style.left = (btnWidth + opts.posterWidth + gapWidth*i)-rw + 'px';
             v.style.top = (opts.posterHeihgt-rh)/2 + 'px';
             v.style.zIndex =  rlevel--;
             v.style.opacity = opacityVal;
        });


        //设置左侧图片位置
        var llevel = picHalfNum;
        var lw ,lh ,j=0,opacVal =1;
        leftElements.forEach(function(v){
          
             lw = opts.posterWidth * Math.pow(opts.scale,llevel);
             lh = opts.posterHeihgt * Math.pow(opts.scale,llevel);
             opacVal = 1 * Math.pow(opts.scale,llevel);

             v.style.width = lw + 'px';
             v.style.height = lh + 'px';
             v.style.left =  gapWidth*j++ + 'px';
             v.style.top = (opts.posterHeihgt-lh)/2 + 'px';
             v.style.zIndex =  j;
             v.style.opacity = opacVal;
             llevel--;
        });
         
        this.leftBtn.addEventListener('click',function(){
            that.carousel('left');
        });

       
        this.rightBtn.addEventListener('click',function(){
            that.carousel('right');
        });

    },
    carousel:function(dir){
         var _this_  = this;
         var i=0;
        if(dir == "left"){
           this.liElements.forEach(function(el){
                var self = el;
                    if(++i<_this_.countNum){
                        
                    prev = el.previousElementSibling? el.previousElementSibling:_this_.lastEl;

                    tempwidth=self.style.width;
                    tempheight=self.style.height;
                    temptop=self.style.top;
                    templeft=self.style.left;
                    tempzIndex=self.style.zIndex;
                    opacity=self.style.opacity;
                 
                     self.style.width=prev.style.width;
                     self.style.height=prev.style.height;
                     self.style.top=prev.style.top;
                     self.style.left=prev.style.left;
                     self.style.opacity=prev.style.opacity;
                     self.style.zIndex=prev.style.zIndex;
 
                     prev.style.width=tempwidth;
                     prev.style.height=tempheight;
                     prev.style.top=temptop;
                     prev.style.left=templeft;
                     prev.style.zIndex=tempzIndex;
                     prev.style.opacity=opacity;
                     prev.style.transition = "width,height,top,left 0.7s "
                    }
           });

        }else{
            this.liElements.forEach(function(ele){
                var currtentEl = ele,
                    next = ele.nextiousElementSibling? ele.nextElementSibling:_this_.firstEl;

                   tempwidth=currtentEl.style.width;
                   tempheight=currtentEl.style.height;
                   temptop=currtentEl.style.top;
                   templeft=currtentEl.style.left;
                   tempzIndex=currtentEl.style.zIndex;
                   opacity=currtentEl.style.opacity;
                
                    currtentEl.style.width=next.style.width;
                    currtentEl.style.height=next.style.height;
                    currtentEl.style.top=next.style.top;
                    currtentEl.style.left=next.style.left;
                    currtentEl.style.zIndex=next.style.zIndex;
                    currtentEl.style.opacity=next.style.opacity;


                    next.style.width=tempwidth;
                    next.style.height=tempheight;
                    next.style.top=temptop;
                    next.style.left=templeft;
                    next.style.zIndex=tempzIndex;
                    next.style.opacity=opacity;
                    next.style.transition = "width,height,top,left 0.7s "
           });
        }
    }
    
};