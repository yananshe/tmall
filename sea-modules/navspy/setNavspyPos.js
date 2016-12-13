/*设置(position:fixed)元素与另一个元素的相对水平偏移，实现在窗口大小改变时，保持两者距离不变*/
define(function(require,exports,module){
	var $ = require('../jquery-1.10.1.min.js');

	exports.set = function(elem,relativeElem,dir,offset){
		var e_width = $(elem).width();
		var r_width = $(relativeElem).width();
		var setfn = function(){
			if(dir ==='left' || dir ==='right'){
				$(elem).css(dir, ($(window).width() - r_width) / 2 - e_width - offset);	
			}
		};

		setfn();
		$(window).on('resize',setfn);
	};

});