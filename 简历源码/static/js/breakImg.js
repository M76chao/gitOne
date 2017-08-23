/**
 * Created by sens on 2017/4/29.  8.22 by dream add commit -m "构造函数，建造动画用的"
 */
function MakeBreakImg(obj) {
    this.el = obj.el instanceof jQuery ? obj.el : $(obj.el); //判断书不是引入了jquery
    this.cont = obj.container || null;
    if (this.el.width() === 0 && !this.el.complete) { //图片未加载完成
        console.warn('this picture is not loaded now'); //warn VSlog 前面加一个黄色的警告符号
    } else {
        this.wid = this.el.width();
        this.hei = this.el.height();
    }
    this.strStyle = obj.strStyle;
    this.itemSpl = obj.itemSpl || 5;
    this.itemWid = this.wid / this.itemSpl;
    this.itemSplSub = Math.ceil(this.hei / this.itemWid);
    this.backUrl = obj.url || this.el[0].src || this.attr('src');
    this.arrItem = [];
    if (this.el) {
        this.init();
    }
}
MakeBreakImg.prototype = { //构造函数原型
    Constructor: MakeBreakImg,
    init: function() {
        var obj = this;
        var _$dom = null;
        if (!obj.cont) {
            _$dom = $('<div></div>'); //使用jquery了，作者的确有点懒了
            _$dom.css({ //把需要动画的图片装在div中，并增加三维效果
                width: obj.wid,
                height: obj.hei,
                display: obj.el.css('display') === 'inline' ? 'inline-block' : 'block',
                margin: obj.el.css('margin'),
                fontSize: 0,
                perspective: '10000px',
                //-webkit-perspective: '10000px',
                perspectiveOrigin: '50% 50%'
            });
            _$dom[0].style.cssText = _$dom[0].style.cssText + obj.strStyle;
            obj.cont = _$dom;
        }
        for (var j = 0; j < obj.itemSplSub; j++) { //地球爆炸的碎片的效果
            for (var i = 0; i < obj.itemSpl; i++) {
                _$dom = $('<div></div>');
                _$dom.css({
                    width: obj.itemWid,
                    height: obj.itemWid,
                    display: 'inline-block',
                    background: 'url(' + obj.backUrl + ') no-repeat ' + (-i * obj.itemWid) + 'px ' + (-j * obj.itemWid) + 'px',
                    backgroundSize: this.wid + 'px ' + this.hei + 'px',
                    transition: 'all 1s linear'
                });
                obj.arrItem.push(_$dom);
                _$dom.appendTo(obj.cont);
            }
        }
        obj.el.replaceWith(obj.cont);
    },

    makeBreak: function() { //图片旋转
        var obj = this;
        setTimeout(function() {
            $(obj.arrItem).each(function(idx, item) {
                item.css('transform', 'translate3d(0,0,' + (15000 - Math.random() * 5000) + 'px)' +
                    ' rotateX(' + (360 - Math.random() * 720) + 'deg) ' +
                    'rotateY(' + (360 - Math.random() * 720) + 'deg) ' +
                    'rotate(' + (360 - Math.random() * 720) + 'deg) ' +
                    'skew(' + (45 - Math.random() * 90) + 'deg) '
                )
            });
        }, 0)
    },
    makeResume: function() {
        var obj = this;
        $(obj.arrItem).each(function(idx, item) {
            item.css('transform', '');
        });
    }
};