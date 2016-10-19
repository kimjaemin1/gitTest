(function($) {

 var hdamalleFfect = function(element, options){
   var settings = $.extend({}, $.fn.hdamalleffect.defaults, options); //초반 셋팅값 가져오기
     var vars = {
            currentSlide: 0,
			oldSlide: 0,
			startSlide: 0,
            currentImage: '',
			totaltab: 0,	
			currenttab: 0,	
			arraheight:0,
			arrawidth2:0,
            totalSlides: 0,
            randAnim: '',
            running: false,
            paused: false,
            stop: false
        };

       var slider = $(element);		
	    //이미지사이즈
	    vars.arraheight = $(".wrapper-li", slider).height();
 	    slider.find('.wrapper-li').each(function() {
			 
			vars.totalSlides++;
		});    
	        
    vars.currentSlide = Math.floor(Math.random() * vars.totalSlides);
    vars.oldSlide = vars.currentSlide;
      if(settings.moveType =="top"){
          $('.wrapper-li', slider).css({top: vars.arraheight + 'px'});     
	      $('.wrapper-li', slider).eq(vars.currentSlide).css({top: 0 + 'px'});
	  }else{
          $('.wrapper-li', slider).css({top: - vars.arraheight + 'px'});     
	      $('.wrapper-li', slider).eq(vars.currentSlide).css({top: 0 + 'px'});

	  }    
   
    
 

	 var timer = 0;
	timer = setInterval(function(){ imgeffectRun(slider, settings, false); }, settings.pauseTime);




	var imgeffectRun = function(slider, settings, nudge){
       //Trigger the lastSlide callback
	     vars.running = true;
            if(vars && (vars.currentSlide == vars.totalSlides - 1)){ 
				settings.lastSlide.call(this);
			}
            if((!vars || vars.stop) && !nudge) return false;
			settings.beforeChange.call(this);
			vars.currentSlide++;		
			
			if(vars.currentSlide == vars.totalSlides){ 
				vars.currentSlide = 0;
				settings.slideshowEnd.call(this);
			}
		
			if(settings.moveType == "top"){  //위쪽이동
				       $('.wrapper-li', slider).eq(vars.oldSlide).css({'z-index':1}).animate({top: - vars.arraheight + 'px'}, settings.animSpeed, '',function(){ 
					    $(this).css({top : vars.arraheight + 'px'})
					   
					   });
                       $('.wrapper-li', slider).eq(vars.currentSlide).css({'z-index':10}).animate({top: 0 + 'px'}, settings.animSpeed,'',function(){
						 vars.running = false;
					   });					  
				

			}else{
                  
			        $('.wrapper-li', slider).eq(vars.oldSlide).css({'z-index':1}).animate({top:  vars.arraheight + 'px'}, settings.animSpeed, '',function(){ 
					    $(this).css({top :  - vars.arraheight + 'px'})
					   
					   });
                       $('.wrapper-li', slider).eq(vars.currentSlide).css({'z-index':10}).animate({top: 0 + 'px'}, settings.animSpeed,'',function(){
						 vars.running = false;
					   });				


			} 

          vars.oldSlide = vars.currentSlide;
	}
   
    $('.prev', slider).click(function(){
		if( vars.running == false ){
			vars.currentSlide = vars.currentSlide - 2;
            imgeffectRun(slider,  settings, false);
		}
	});
     $('.next', slider).click(function(){
		 if( vars.running == false ){
		  imgeffectRun(slider,  settings, false);
		  }
	 });
    //오버설정
    slider.hover(function(){
                vars.paused = true;
                clearInterval(timer);
                timer = '';              

            }, function(){
                vars.paused = false;
				
                //Restart the timer
				if(timer == '' && !settings.manualAdvance){
					timer = setInterval(function(){   imgeffectRun(slider,  settings, false);	}, settings.pauseTime);
				}
      });
	
      

   settings.afterLoad.call(this);
	return this;
	 };


  
 $.fn.hdamalleffect = function(options) {
    //데이터 로딩셋팅
        return this.each(function(key, value){
            var element = $(this);
			
			 hdamalleFfect($(element), options);
        });

	};

//Default settings
	$.fn.hdamalleffect.defaults = {
		animSpeed: 1500, //이벤트 속도
		pauseTime: 3000, //대기시간
		moveType: "top", //이동방향
		tailType: "number", //버튼타입
		pauseOnHover: true,
		beforeChange: function(){},
		afterChange: function(){},
		slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){}
	};
	
	$.fn._reverse = [].reverse;

})(jQuery);

