define(function(require,exports,module){
	var $ = require('../jquery-1.10.1.min.js');

	var Dropdown = function(elem,options){
		this.$elem = $(elem);
		this.opt = $.extend({},Dropdown.defaults,options);
	};
	module.exports = Dropdown;
	Dropdown.defaults = {
		effect: 'slide',
		time: 400,
		toggle: 'hover'
	};
	Dropdown.prototype.init = function(){
		var that = this;
		this.$elem.each(function(){
			      $this = $(this);
			var $toggle = $this.find('.dropdown-toggle'),
			   $content = $this.find('.dropdown-content'),
			    togData = {toggle:$toggle.data('toggle')},
			    conData = {effect:$content.data('effect')},
			     option = $.extend({},that.opt,togData,conData);
			   
			if(option.toggle === 'hover'){
				$this.hover(function(){
					that.show($content,option);
				},function(){
					that.hide($content,option);
				});
			}else if(option.toggle === 'click'){
				$toggle.click(function(){
					if($content.css('display') === 'none'){
						that.show($content,option);
					}else{
						that.hide($content,option);
					}
				});
			}

		});
	};
	Dropdown.prototype.show = function(el,opt){
		var $el = $(el);
		switch(opt.effect){
			case 'slide':
				$el.slideDown(this.opt.time);
				break;
			case 'none':
				$el.css('display','block');
				break;
			default:
				$el.fadeIn(this.opt.time);
		}
	};
	Dropdown.prototype.hide = function(el,opt){
		var $el = $(el);
		switch(opt.effect){
			case 'slide':
				$el.slideUp(this.opt.time);
				break;
			case 'none':
				$el.css('display','none');
				break;
			default:
				$el.fadeOut(this.opt.time);
		}
	};
});