/**
 * Created by vicky on 2/12/2017.
 */
(function(){

    function Component( parent ){
        this.init();
    }
    Component.prototype.init = function(){
        var self = this;
        Component.lists = [];
        this.canvas = $('.canvas');
        this.canvas.bind('click',function( event ){
            self.add( event.pageY , event.pageX );
        })
    };
    Component.prototype.add = function( top , left ){
        debugger;
        var id = ~~(Math.random()*10000);
        var elem = this.createElem( id , top , left );
        this.canvas.append( elem );
        window.bindMouseEvent( elem );
    };
    Component.prototype.createElem = function( id , top , left){
        top = top || '0px';
        left = left || '0px';
        var elem =  $("<div>", {
            "id":id,
            "class": "rect"
        }).css({
            "position":"absolute",
            "top":top,
            "left":left
        });
        return elem;
    };
    Component.prototype.del = function(){

    };
    Component.prototype.get = function(){

    };
    Component.prototype.update = function(){

    };

    window.Component = Component;
})();