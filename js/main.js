(function(){
    $(document).ready(function(){
        var cube = $('.cube');
        var cubeHeight = $(cube).height() - 5;
        var cubeWidth = $(cube).width() - 5;
        var cubeOffsetLeft = $(cube).offset().left;
        var cubeOffsetTop = $(cube).offset().top;
        var cubeTransformWidth = 0;
        var cubeTransformHeight = 0;
        var cubeCurrentHeight = 0;
        var cubeCurrentWidth = 0;
        var cubeCurrentLeft = 0;
        var cubeCurrentTop = 0;
        var currentDirection = '';

        var mousedownPointX = 0;
        var mousedownPointY = 0;
        var windowPointX = 0;
        var windowPointY = 0;

        var draglock = false;

        // cube内八方向鼠标样式及相应取值
        $(cube).mousemove(function(event){
            var pointX = event.pageX - cubeOffsetLeft;
            var pointY = event.pageY - cubeOffsetTop;

            if(pointX < 5 && pointY < 5){
                $(this).css('cursor', 'nw-resize');
                $(this).on('mousedown', function(event){
                    mousedownPointY = event.pageY;
                    mousedownPointX = event.pageX;
                    currentDirection = 'nw';
                    cubeCurrentHeight = $(cube).height();
                    cubeCurrentWidth = $(cube).width();
                    cubeCurrentTop = $(cube).offset().top;
                    cubeCurrentLeft = $(cube).offset().left;
                    draglock = true;
                });
            }else if(pointX > cubeWidth && pointY > cubeHeight){
                $(this).css('cursor', 'se-resize');
                $(this).on('mousedown', function(event){
                    mousedownPointY = event.pageY;
                    mousedownPointX = event.pageX;
                    currentDirection = 'se';
                    cubeCurrentHeight = $(cube).height();
                    cubeCurrentWidth = $(cube).width();
                    draglock = true;
                });
            }else if(pointX < 5 && pointY > cubeHeight){
                $(this).css('cursor', 'sw-resize');
                $(this).on('mousedown', function(event){
                    mousedownPointY = event.pageY;
                    mousedownPointX = event.pageX;
                    currentDirection = 'sw';
                    cubeCurrentHeight = $(cube).height();
                    cubeCurrentWidth = $(cube).width();
                    cubeCurrentLeft = $(cube).offset().left;
                    draglock = true;
                });
            }else if(pointX > cubeWidth && pointY < 5){
                $(this).css('cursor', 'ne-resize');
                $(this).on('mousedown', function(event){
                    mousedownPointY = event.pageY;
                    mousedownPointX = event.pageX;
                    currentDirection = 'ne';
                    cubeCurrentHeight = $(cube).height();
                    cubeCurrentWidth = $(cube).width();
                    cubeCurrentTop = $(cube).offset().top;
                    draglock = true;
                });
            }else if(pointX < 5 && pointY >= 5){
                $(this).css('cursor', 'w-resize');
                $(this).on('mousedown', function(event){
                    mousedownPointX = event.pageX;
                    currentDirection = 'w';
                    cubeCurrentWidth = $(cube).width();
                    cubeCurrentLeft = $(cube).offset().left;
                    draglock = true;
                });
            }else if(pointY < 5 && pointX >= 5){
                $(this).css('cursor', 'n-resize');
                $(this).on('mousedown', function(event){
                    mousedownPointY = event.pageY;
                    currentDirection = 'n';
                    cubeCurrentHeight = $(cube).height();
                    cubeCurrentTop = $(cube).offset().top;
                    draglock = true;
                });
            }else if(pointX > cubeWidth && pointY <= cubeHeight){
                $(this).css('cursor', 'e-resize');
                /*$(this).text(pointX + ', ' + cubeWidth);*/
                $(this).on('mousedown', function(event){
                    mousedownPointX = event.pageX;
                    currentDirection = 'e';
                    cubeCurrentWidth = $(cube).width();
                    draglock = true;
                });
            }else if(pointY > cubeHeight && pointX <= cubeWidth){
                $(this).css('cursor', 's-resize');
                $(this).on('mousedown', function(event){
                    mousedownPointY = event.pageY;
                    currentDirection = 's';
                    cubeCurrentHeight = $(cube).height();
                    draglock = true;
                });
            }else{
                $(this).css({
                    'cursor': 'default'
                });
            }

        });

        // 全局mouse坐标监听
        $(document).mousemove(function(event){
            windowPointX = event.pageX;
            windowPointY = event.pageY;
            if(draglock === true){
                calTransformCube();
            }
        }).mouseup(function(){
            draglock = false;
            resetCubeData();
        });

        // border拖动计算
        function calTransformCube(){
            var destHeight = 0;
            var destWidth = 0;
            var destTop = 0;
            var destLeft = 0;
            switch(currentDirection){
                case 'n':
                    cubeTransformHeight = windowPointY -  mousedownPointY;
                    destHeight = cubeCurrentHeight - cubeTransformHeight;
                    destTop = cubeCurrentTop + cubeTransformHeight;
                    if(destHeight > 10){
                        $(cube).css({
                            'height': destHeight,
                            'top': destTop
                        });
                    }
                    break;
                case 'e':
                    cubeTransformWidth = windowPointX -  mousedownPointX;
                    destWidth = cubeCurrentWidth + cubeTransformWidth;
                    if(destWidth > 10){
                        $(cube).css({
                            'width': destWidth,
                        });
                    }
                    break;
                case 's':
                    cubeTransformHeight = windowPointY -  mousedownPointY;
                    destHeight = cubeCurrentHeight + cubeTransformHeight;
                    if(destHeight > 10){
                        $(cube).css({
                            'height': destHeight,
                        });
                    }
                    break;
                case 'w':
                    cubeTransformWidth = windowPointX -  mousedownPointX;
                    destWidth = cubeCurrentWidth - cubeTransformWidth;
                    destLeft = cubeCurrentLeft + cubeTransformWidth;
                    if(destWidth > 10){
                        $(cube).css({
                            'width': destWidth,
                            'left': destLeft
                        });
                    }
                    break;
                case 'nw':
                    cubeTransformHeight = windowPointY -  mousedownPointY;
                    cubeTransformWidth = windowPointX -  mousedownPointX;
                    destHeight = cubeCurrentHeight - cubeTransformHeight;
                    destWidth = cubeCurrentWidth - cubeTransformWidth;
                    destTop = cubeCurrentTop + cubeTransformHeight;
                    destLeft = cubeCurrentLeft + cubeTransformWidth;
                    if(destHeight > 10){
                        $(cube).css({
                            'height': destHeight,
                            'top': destTop
                        });
                    }
                    if(destWidth > 10){
                        $(cube).css({
                            'width': destWidth,
                            'left': destLeft
                        });
                    }
                    break;
                case 'se':
                    cubeTransformHeight = windowPointY -  mousedownPointY;
                    cubeTransformWidth = windowPointX -  mousedownPointX;
                    destHeight = cubeCurrentHeight + cubeTransformHeight;
                    destWidth = cubeCurrentWidth + cubeTransformWidth;
                    if(destHeight > 10){
                        $(cube).css({
                            'height': destHeight
                        });
                    }
                    if(destWidth > 10){
                        $(cube).css({
                            'width': destWidth
                        });
                    }
                    break;
                case 'ne':
                    cubeTransformHeight = windowPointY -  mousedownPointY;
                    cubeTransformWidth = windowPointX -  mousedownPointX;
                    destHeight = cubeCurrentHeight - cubeTransformHeight;
                    destWidth = cubeCurrentWidth + cubeTransformWidth;
                    destTop = cubeCurrentTop + cubeTransformHeight;
                    if(destHeight > 10){
                        $(cube).css({
                            'height': destHeight,
                            'top': destTop
                        });
                    }
                    if(destWidth > 10){
                        $(cube).css({
                            'width': destWidth,
                        });
                    }
                    break;
                case 'sw':
                    cubeTransformHeight = windowPointY -  mousedownPointY;
                    cubeTransformWidth = windowPointX -  mousedownPointX;
                    destHeight = cubeCurrentHeight + cubeTransformHeight;
                    destWidth = cubeCurrentWidth - cubeTransformWidth;
                    destLeft = cubeCurrentLeft + cubeTransformWidth;
                    if(destHeight > 10){
                        $(cube).css({
                            'height': destHeight
                        });
                    }
                    if(destWidth > 10){
                        $(cube).css({
                            'width': destWidth,
                            'left': destLeft
                        });
                    }
                    break;
                default:
                    throw 'direction error';
            }
        }

        // 更新cube数据
        function resetCubeData(){
            cubeHeight = $(cube).height() - 5;
            cubeWidth = $(cube).width() - 5;
            cubeOffsetLeft = $(cube).offset().left;
            cubeOffsetTop = $(cube).offset().top;
            $(cube).off( "mousedown" );
        }

    });

})();