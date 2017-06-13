(function($){

	var $picSwitchImg=$('#picSwitch').find('img'),
		$picSwitchPage=$('#picSwitchPage'),
		$picSwitchPageSpan=$picSwitchPage.find('span'),
		lastCur,
		ismousein,
		playTimeout,
		isPlaying,
		switchCur=-1;

	var txtright=['8%','5%','8%','4%'];
	var picleft=['4%','-28%','-21%','8%'];
	var picleftIn=['-10%','-50%','-50%','-10%'];
	function play(p){
		isPlaying=true;
		lastCur=switchCur;
		if(p==undefined){
			switchCur++;
			if(switchCur>$picSwitchImg.length/2-1){
				switchCur=0;
			}
		}else{
			switchCur=p;
		}
		


		if(lastCur>-1){
			$picSwitchImg.eq(lastCur*2).animate({
	    		'opacity':0
	    	},{
	    		duration :600,
	    		complete :function(){
	    			this.style.left=picleftIn[lastCur];
	    		}
	    	});

			$picSwitchImg.eq(lastCur*2+1).animate({
	    		'opacity':0
	    	},{
	    		duration :600,
	    		complete :function(){
	    			this.style.right='-10%';
	    		}
	    	});
		}

		setTimeout(function(){
			if(lastCur!==undefined){
				$picSwitchPage.find('.cur').removeClass('cur');
				$picSwitchPageSpan[switchCur].className='cur';
			}
			$picSwitchImg.eq(switchCur*2).animate({
	    		'opacity':1,
	    		'left':picleft[switchCur]
	    	},{
	    		duration :600,
	    		complete :function(){
					isPlaying=false;
	    			
	    			if(!ismousein){
	    				playTimeout=setTimeout(function(){
	    					play();
	    				},3000);
	    			}
	    			
	    		}
	    	});
		    
		    $picSwitchImg.eq(switchCur*2+1).animate({
	    		'opacity':1,
	    		'right':txtright[switchCur]
	    	},{
	    		duration :600,
	    		complete :function(){

	    		}
	    	});
		},lastCur!==undefined?0:500);
	}
	play();

	$('#picSwitch').on('mouseover',function(e){
		clearTimeout(playTimeout);
		playTimeout=null;
		ismousein=true;
	}).on('mouseleave',function(e){
		ismousein=false;

		if(playTimeout==null){
			playTimeout=setTimeout(function(){
				play();
			},3000);
		}
		
	});
	$picSwitchPage.on('click',function(e){
		var target = e.target,
		p = +target.getAttribute('data-p');
		if(p==switchCur || isPlaying){
			return;
		}
		play(p);
	});

	var pageScrollTop,
		$page;
	var pageScroll=function(e){
		if(!pageScrollTop){
			$page=$('#page1,#page2,#page3,#page4,#page5,#page6');
			pageScrollTop=[];
			$page.each(function(i,el){
				pageScrollTop[i]=$(el).offset().top+el.offsetHeight;
			});
		}
		var len=pageScrollTop.length,
			showH=( document.body.scrollTop || document.documentElement.scrollTop )+document.body.clientHeight;
		for(;len--;){
			if(pageScrollTop[len] && showH>pageScrollTop[len]){
				$page.eq(len).find('.Funcpic').animate(len%2>0?{'opacity':1,'right':'0px'}:{'opacity':1,'left':'0px'},{
		    		duration :600,
		    		complete :function(){
		    		}
		    	});
				$page.eq(len).find('.txt').animate(len%2>0?{'opacity':1,'left':'0px'}:{'opacity':1,'right':'0px'},{
		    		duration :600,
		    		complete :function(){

		    		}
		    	});
		    	pageScrollTop[len]=undefined;
		    	if(len+1==$page.length){
		    		$(window).off('scroll');
		    	}
			}
		}
	};
	
	$('#btnWX').mouseover(function(){
		$('.codeWX').show();
	}).mouseout(function(){
		$('.codeWX').hide();
	});

	$(window).on('scroll',pageScroll);
	pageScroll();

})(jQuery);