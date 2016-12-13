define(function(require,exports,module){
	var $ = require('../jquery-1.10.1.min.js');

	exports.init = function(){

		var $txt     = $('.search .txt'),
		    valArr   = [''],
		    timer    = null,
		    $subList = $('.search-tips'),
		    $label   = $('.search label'),
		    $btn     = $('.search .btn');

		$txt.val('');
		$txt.focus(function(){
			if($.trim($txt.val()) !== '') $subList.css('display','block');
			$label.css('color','#ccc');
			timer = setInterval(inputListener,10);
		});
		$txt.blur(function(){
			$subList.css('display','none');
			if($.trim($(this).val()) === '') $label.css('display','block').css('color','#555');
			clearInterval(timer);
		});
		$btn.click(function(){
			$(this).disabled = 'disabled';
		});

		var inputListener = function(){

			valArr.push($.trim($txt.val()));
			if(valArr.length > 2) valArr.shift();
			if( valArr[1] === '' ) {
				$subList.css('display','none');
				return;
			}
			if( valArr[1] === valArr[0] ) return;
			
			$label.css('display','none');
			$('.store').find('span').html(valArr[1]);
			
			$.get('search.php',{content:valArr[1]},function(data){
				var arr = [];
				$.each(data,function(i){
					if( i>9 ){ return false; }
					var nameArr = data[i].name.split(valArr[1]);
					arr.push($('<li><a href="'+ data[i].link +'"><strong>'+ nameArr[0] +'<em>'+ valArr[1] +'</em>' + nameArr[1] +'</strong><span class="amount">约'+ data[i].num +'个结果</span></a></li>'));
				})
				$subList.find('li:not(.store)').remove()
							   .end().prepend(arr).css('display','block');
			})
		}
	};

	exports._toggle = function(val){
		$(window).scroll(function(){
			var $searcher = $('.search-container');
			if($(this).scrollTop() >= val && !$searcher.hasClass('search-fixed')){
				$searcher.addClass('search-fixed').css('display','none').slideDown(200);
			}else if($(this).scrollTop() < val && $searcher.hasClass('search-fixed') && !$searcher.is(':animated')){
				$searcher.slideUp(200,function(){
					$searcher.removeClass('search-fixed').css('display','block');
				})
			}
		})
	};

});