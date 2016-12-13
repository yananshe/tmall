
/*
参数
effect：图片切换效果(slide、fade)。 通过参数传入或 .carousel自定义属性 data-effect,默认slide。
auto:图片自动播放。通过参数传入auto:'none'或 .carousel自定义属性 data-auto="none",清除自动播放，默认自动播放。
interval:图片轮播时间间隔，通过参数传入。
pause:暂停图片自动轮播的事件。只接受一个参数：hover。

.carousel-indicator 自定义属性 data-toggle 可设置触发事件。接受两个值：hover、click,默认click。

 */


define(function(require,exports,module){
	var $ = require('../jquery-1.10.1.min.js');

	var Carousel = function(elem,opt){
		this.$elem       = $(elem);
		this.opt         = $.extend({},Carousel.defaults,opt);
		this.num         = 0;
		this.$item       = this.$elem.find('.item');
		this.$indicators = this.$elem.find('.carousel-indicator li');
		this.$active     = null;
		this.$following  = null;
		this.$prev       = null;
		this.$next       = null;
		this.sliding     = null;
		this.timer       = null;
		this.status      = null;
		
	};

	module.exports = Carousel;
	Carousel.defaults = {
		interval:3000,
		pause: 'hover',
		effect: 'slide',
		auto: 'true'
	};
	Carousel.prototype.init = function(){
		var that = this;

		this.$elem.hover(function(){
			that.pause();
		},function(){
			that.status && that.auto();
			that.status = null;
		});

		this.$elem.on('click','[data-carousel-control]',function(){
			that[$(this).data('carousel-control')]();
		});

		this.$indicators.each(function(i){
			var timer = null;
			var data = $(that.$elem.find('.carousel-indicator')).data('toggle');

			if(data == 'hover'){
				$(this).hover(function(){
					clearInterval(timer);   
					timer = setInterval (function(){
						that.go(i);
					},50);
				},function(){
					clearInterval(timer);
				});
			}else{
				$(this).on(data,function(){
					that.go(i);
				});
			}
		});

		if(this.$elem.data('auto') == 'none' || this.opt.auto == 'none') return;
		this.auto();

	};

	Carousel.prototype.prev = function(){
		if(this.sliding) return; 
		return this.animate('prev');
	};
	Carousel.prototype.next = function(){
		if(this.sliding) return;
		return this.animate('next');
	};
	Carousel.prototype.pause = function(){
		this.timer && (this.status = 'timerOn') && clearInterval(this.timer);
		return this;
	};
	Carousel.prototype.auto = function(){
		var that = this;
		this.timer && clearInterval(this.timer);
		this.timer = setInterval(function(){
			that.animate('next');	
		},this.opt.interval);
		return this;
	};
	Carousel.prototype.go = function(n){
		if(this.sliding) return;
		if(n == this.num || n<0 || n>this.$item.length-1) return;
		this.animate(n>this.num?'next':'prev',n);
		return this;
	};
	Carousel.prototype.animate = function(dir,num){
		var activeIndex =  this.$item.index(this.$active = this.$elem.find('.item.active')),
			isNum       =  typeof num == 'number'?true : false,
		    index       =  isNum? num : (this.num = activeIndex),
		    offset      =  this.$item.width(),
		    that        =  this,
		    len         =  this.$item.length;


		if( dir == 'prev'){
			offset *= 1;
			isNum || index--;
		}else if(dir == 'next'){
			offset *= -1;
			isNum || index++;
		}

		var i = index % len ;
		index = i>=0?i:(i+len);

		this.$following = this.$item.eq(index);
		this.$indicators.removeClass('active').eq(index).addClass('active');

		this.sliding = true;
		if(this.$elem.data('effect') =='fade' || this.opt.effect == 'fade'){

			this.$active.fadeOut();
			this.$following.fadeIn(function(){
				that.$following.addClass('active');
				that.$active.removeClass('active');
				that.sliding = false;
				that.num = index;
			});
		}else{

			this.$following.addClass('active').css('left',-offset);
			this.$active.animate({'left':offset},500);
			this.$following.animate({'left':0},500,function(){			
				that.$active.removeClass('active');
				that.sliding = false;
				that.num = index;
			});
		}
		
		return this;
	};

});