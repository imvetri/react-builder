/**
 * edited by vicky on 2/12/2017.
 * forked from a codepen fork
 */
function bindMouseEvent(rect){
    var rectHeight = $(rect).height() - 5;
    var rectWidth = $(rect).width() - 5;
    var rectOffsetLeft = $(rect).offset().left;
    var rectOffsetTop = $(rect).offset().top;
    var rectTransformWidth = 0;
    var rectTransformHeight = 0;
    var rectCurrentHeight = 0;
    var rectCurrentWidth = 0;
    var rectCurrentLeft = 0;
    var rectCurrentTop = 0;
    var currentDirection = '';

    var mousedownPointX = 0;
    var mousedownPointY = 0;
    var windowPointX = 0;
    var windowPointY = 0;

    var draglock = false;

    $(rect).mousemove(function(event){
        var pointX = event.pageX - rectOffsetLeft;
        var pointY = event.pageY - rectOffsetTop;

        if(pointX < 5 && pointY < 5){
            $(this).css('cursor', 'nw-resize');
            $(this).on('mousedown', function(event){
                mousedownPointY = event.pageY;
                mousedownPointX = event.pageX;
                currentDirection = 'nw';
                rectCurrentHeight = $(rect).height();
                rectCurrentWidth = $(rect).width();
                rectCurrentTop = $(rect).offset().top;
                rectCurrentLeft = $(rect).offset().left;
                draglock = true;
            });
        }else if(pointX > rectWidth && pointY > rectHeight){
            $(this).css('cursor', 'se-resize');
            $(this).on('mousedown', function(event){
                mousedownPointY = event.pageY;
                mousedownPointX = event.pageX;
                currentDirection = 'se';
                rectCurrentHeight = $(rect).height();
                rectCurrentWidth = $(rect).width();
                draglock = true;
            });
        }else if(pointX < 5 && pointY > rectHeight){
            $(this).css('cursor', 'sw-resize');
            $(this).on('mousedown', function(event){
                mousedownPointY = event.pageY;
                mousedownPointX = event.pageX;
                currentDirection = 'sw';
                rectCurrentHeight = $(rect).height();
                rectCurrentWidth = $(rect).width();
                rectCurrentLeft = $(rect).offset().left;
                draglock = true;
            });
        }else if(pointX > rectWidth && pointY < 5){
            $(this).css('cursor', 'ne-resize');
            $(this).on('mousedown', function(event){
                mousedownPointY = event.pageY;
                mousedownPointX = event.pageX;
                currentDirection = 'ne';
                rectCurrentHeight = $(rect).height();
                rectCurrentWidth = $(rect).width();
                rectCurrentTop = $(rect).offset().top;
                draglock = true;
            });
        }else if(pointX < 5 && pointY >= 5){
            $(this).css('cursor', 'w-resize');
            $(this).on('mousedown', function(event){
                mousedownPointX = event.pageX;
                currentDirection = 'w';
                rectCurrentWidth = $(rect).width();
                rectCurrentLeft = $(rect).offset().left;
                draglock = true;
            });
        }else if(pointY < 5 && pointX >= 5){
            $(this).css('cursor', 'n-resize');
            $(this).on('mousedown', function(event){
                mousedownPointY = event.pageY;
                currentDirection = 'n';
                rectCurrentHeight = $(rect).height();
                rectCurrentTop = $(rect).offset().top;
                draglock = true;
            });
        }else if(pointX > rectWidth && pointY <= rectHeight){
            $(this).css('cursor', 'e-resize');
            /*$(this).text(pointX + ', ' + rectWidth);*/
            $(this).on('mousedown', function(event){
                mousedownPointX = event.pageX;
                currentDirection = 'e';
                rectCurrentWidth = $(rect).width();
                draglock = true;
            });
        }else if(pointY > rectHeight && pointX <= rectWidth){
            $(this).css('cursor', 's-resize');
            $(this).on('mousedown', function(event){
                mousedownPointY = event.pageY;
                currentDirection = 's';
                rectCurrentHeight = $(rect).height();
                draglock = true;
            });
        }else{
            $(this).css({
                'cursor': 'default'
            });
        }

    });

    $(document).mousemove(function(event){
        windowPointX = event.pageX;
        windowPointY = event.pageY;
        if(draglock === true){
            calTransformrect();
        }
    }).mouseup(function(){
        draglock = false;
        resetrectData();
    });

    function calTransformrect(){
        console.log('sdf')
        var destHeight = 0;
        var destWidth = 0;
        var destTop = 0;
        var destLeft = 0;
        switch(currentDirection){
            case 'n':
                rectTransformHeight = windowPointY -  mousedownPointY;
                destHeight = rectCurrentHeight - rectTransformHeight;
                destTop = rectCurrentTop + rectTransformHeight;
                if(destHeight > 10){
                    $(rect).css({
                        'height': destHeight,
                        'top': destTop
                    });
                }
                break;
            case 'e':
                rectTransformWidth = windowPointX -  mousedownPointX;
                destWidth = rectCurrentWidth + rectTransformWidth;
                if(destWidth > 10){
                    $(rect).css({
                        'width': destWidth,
                    });
                }
                break;
            case 's':
                rectTransformHeight = windowPointY -  mousedownPointY;
                destHeight = rectCurrentHeight + rectTransformHeight;
                if(destHeight > 10){
                    $(rect).css({
                        'height': destHeight,
                    });
                }
                break;
            case 'w':
                rectTransformWidth = windowPointX -  mousedownPointX;
                destWidth = rectCurrentWidth - rectTransformWidth;
                destLeft = rectCurrentLeft + rectTransformWidth;
                if(destWidth > 10){
                    $(rect).css({
                        'width': destWidth,
                        'left': destLeft
                    });
                }
                break;
            case 'nw':
                rectTransformHeight = windowPointY -  mousedownPointY;
                rectTransformWidth = windowPointX -  mousedownPointX;
                destHeight = rectCurrentHeight - rectTransformHeight;
                destWidth = rectCurrentWidth - rectTransformWidth;
                destTop = rectCurrentTop + rectTransformHeight;
                destLeft = rectCurrentLeft + rectTransformWidth;
                if(destHeight > 10){
                    $(rect).css({
                        'height': destHeight,
                        'top': destTop
                    });
                }
                if(destWidth > 10){
                    $(rect).css({
                        'width': destWidth,
                        'left': destLeft
                    });
                }
                break;
            case 'se':
                rectTransformHeight = windowPointY -  mousedownPointY;
                rectTransformWidth = windowPointX -  mousedownPointX;
                destHeight = rectCurrentHeight + rectTransformHeight;
                destWidth = rectCurrentWidth + rectTransformWidth;
                if(destHeight > 10){
                    $(rect).css({
                        'height': destHeight
                    });
                }
                if(destWidth > 10){
                    $(rect).css({
                        'width': destWidth
                    });
                }
                break;
            case 'ne':
                rectTransformHeight = windowPointY -  mousedownPointY;
                rectTransformWidth = windowPointX -  mousedownPointX;
                destHeight = rectCurrentHeight - rectTransformHeight;
                destWidth = rectCurrentWidth + rectTransformWidth;
                destTop = rectCurrentTop + rectTransformHeight;
                if(destHeight > 10){
                    $(rect).css({
                        'height': destHeight,
                        'top': destTop
                    });
                }
                if(destWidth > 10){
                    $(rect).css({
                        'width': destWidth,
                    });
                }
                break;
            case 'sw':
                rectTransformHeight = windowPointY -  mousedownPointY;
                rectTransformWidth = windowPointX -  mousedownPointX;
                destHeight = rectCurrentHeight + rectTransformHeight;
                destWidth = rectCurrentWidth - rectTransformWidth;
                destLeft = rectCurrentLeft + rectTransformWidth;
                if(destHeight > 10){
                    $(rect).css({
                        'height': destHeight
                    });
                }
                if(destWidth > 10){
                    $(rect).css({
                        'width': destWidth,
                        'left': destLeft
                    });
                }
                break;
            default:
                throw 'direction error';
        }
    }

    function resetrectData(){
        rectHeight = $(rect).height() - 5;
        rectWidth = $(rect).width() - 5;
        rectOffsetLeft = $(rect).offset().left;
        rectOffsetTop = $(rect).offset().top;
        $(rect).off( "mousedown" );
    }

}