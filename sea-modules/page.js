define(function(require,exports,module){
	var $              = require('../sea-modules/jquery-1.10.1.min.js'),
		$userInfo      = $('.user-info'),
		$userList      = $userInfo.find('.item li'),
		$mycharge      = $userList.filter('.mycharge'),
		$charge        = $userInfo.find('.charge'),
		$chargeControl = $charge.find('.control'),
		$amount        = $charge.find('.charge-amount'),
		$selection     = $charge.find('.selection'),
		$selectionList = $selection.find('li'),
		chargestate    = false;

	$userList.each(function(){
		var $this = $(this);
		var $slideDiv = $this.find('.text');
		var $triangle = $slideDiv.find('.tri-right');
		$(this).hover(function(){
			$triangle.animate({opacity:1},400);  //for ie8
			$slideDiv.css('display','block').animate({opacity:1,left:-90},400);
		},function(){
			$triangle.animate({opacity:0},400);  //for ie8
			$slideDiv.animate({opacity:0,left:-120},400,function(){
				$slideDiv.css('display','none');
			});
		});
	});

	$mycharge.click(function(){
		if(chargestate){
			$userInfo.animate({right:-236});
			chargestate = false;
			$(this).removeClass('active');
		}else{
			$userInfo.animate({right:0});
			chargestate = true;
			$(this).addClass('active');
		}
	});

	$chargeControl.click(function(){
		$userInfo.animate({right:-236});
		chargestate = false;
		$mycharge.removeClass('active');
	});

	$amount.find('input').val($selectionList.filter('.active').html());
	$amount.click(function(){
		$selection.show();
		return false;
	});
	$(document).click(function(){
		$selection.hide();
	});
	
	$selectionList.each(function(){
		$(this).click(function(){
			var $this = $(this);
			var $active = $selectionList.filter('.active');

			$active.removeClass('active');
			$this.addClass('active');
			$amount.find('input').val($this.html());
			$selection.hide();
		});
	});


	var $livePrev = $('.live-info .prev'),
		$liveNext = $('.live-info .next'),
		$liveList = $('.live-vedio li');

	
	$('.live-info .thumbnail li').each(function(i){
		$(this).hover(function(){
			$liveList.filter('.active').removeClass('active');
			$liveList.eq(i).addClass('active');
		});
	});

	var thumList = $('.thumbnail-list');
	$liveNext.click(function(){
		var $this = $(this);
		$livePrev.show();
		thumList.animate({'left':'-=492px'},function(){
			if(parseInt(thumList.css('left')) >= (492-thumList.width())){
				$this.hide();
			}
		});
	});
	$livePrev.click(function(){
		var $this = $(this);
		$liveNext.show();
		thumList.animate({'left':'+=492px'},function(){
			if(parseInt(thumList.css('left')) >= 0){
				$this.hide();
				
			}
		});
	});

	
	

});