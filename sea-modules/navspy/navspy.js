define(function(require,exports,module){
	var $ = require('../jquery-1.10.1.min.js');

	var Navspy = function(elem,options){
		this.opt = $.extend({},Navspy.dafaults,options);
		this.$nav = $(elem);
		this.$navList = this.$nav.find('li');
	};
	module.exports = Navspy;
	Navspy.dafaults = {
		offset: 0,
		toggleVal:500,
		navShow:function(el){
			el.fadeIn();
		},

		navHide:function(el){
			el.fadeOut();
		},

	};

	Navspy.prototype.init = function(){
		var  that = this;
		$(window).on('scroll',$.proxy(this.scrolling, this));
		this.skip();
		
	};

	Navspy.prototype.toggling = function(){	

		if((this.opt.toggleVal - this._scrollTop) <= this.opt.offset){
			this.opt.navShow(this.$nav);
		}else{
			this.opt.navHide(this.$nav);
		}
	};

	Navspy.prototype.scrolling = function(){
		var that       = this,
		    prevActive = this.$navList.filter('.active');

		this._scrollTop = Math.floor($(document).scrollTop());
		this.toggling();

		this.$navList.each(function(i){
			var $this   = $(this),
			    $target = getTarget($this),
			    dis; 

			if(!$target) return;

			dis = Math.floor($target.offset().top - that.opt.offset);
			if(that._scrollTop >= dis && that._scrollTop <= dis + $target.height()){
				prevActive && prevActive.removeClass('active');
				$this.addClass('active');
			}
		});
	};

	Navspy.prototype.skip = function(e){
		var that = this;
		    
		this.$navList.each(function(){
			var $this = $(this);
			$this.click(function(e){
				var prevActive = that.$navList.filter('.active'),
				    $target    = getTarget($this),
				    skipValue;

				if(!$target) return;
				skipValue = Math.ceil($target.offset().top - that.opt.offset);
				$('html,body').animate({scrollTop:skipValue}, 200);
				prevActive && prevActive.removeClass('active');
				$this.addClass('active');
				e.preventDefault();	
			});
		});

	};

	var getTarget = function(elem){
		var data = elem.find('a').attr('href');
		if(/^#\w+/.test(data)){
			return $(data);
		}
	};

});