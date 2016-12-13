define(function(require,exports,module){
	var $          = require('../jquery-1.10.1.min.js'),  
	    $slideMain = $('.slide-main');

	exports.startSlide = function(){
		$slideMain.each(function(){
			var $this = $(this),
			    top   = 0,
			    $item = $this.find('.slide-item'),
			    len   = $item.length,
			    step  = $item.height();

			setInterval(function(){
				top -= step;
				if(parseInt($this.css('top')) <= (1-len)*step){
					top=0;
				} 
				$this.animate({'top':top});
			},5000);

		});

	};

	
})



