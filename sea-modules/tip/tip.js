define(function(require,exports,module){
	var $ = require('../jquery-1.10.1.min.js');
	
	exports.init = function(){
		$('.tip').each(function(){
			var $this = $(this),
				$txt  = $this.find('.tip-content'),
				pos   = $txt.css('left')
				timer = null;
			$this.hover(function(){
				timer = setTimeout(function(){
					$txt.css('display','block').animate({'opacity':1,'left':-$txt.width()},400);
				},100)
				
			},function(){
				clearTimeout(timer);
				$txt.animate({'opacity':0,'left':pos},400,function(){
					$txt.css('display','none');
				})
			});

		})
	}
})