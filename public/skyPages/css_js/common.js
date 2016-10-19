function getMenuHeight(ele)
{
	var height = 0;
		 $(ele).children('li').each(function(){ 
		height += $(this).height()+10;
		});
	
	return height; 
}

$(document).ready(function () {
	
	$('.navi ul li').mouseenter( function () {
			$(this).addClass('on');
			var checkelement = $(this).children('ul');
			$(checkelement).stop().animate({'height' :+getMenuHeight(checkelement)+'px'},300,'easeInOutQuad');
		});
		$('.navi ul li').mouseleave( function () {
			$(this).removeClass('on')
			var checkelement = $(this).children('ul')
			$(checkelement).stop().animate({'height' : '0px'},300,'easeInOutQuad');
		});
		
		$('.box_over').mouseenter(function(){
			$(this).addClass('over');
		});
		$('.box_over').mouseleave(function(){
			$(this).removeClass('over');
		});
		
		$('.message .more_bt1').click(function(){
			$('.message .more_bt1').css('display','none');
			$('.message .more_bt2').css('display','block');
			$('.message .wrap').stop().animate({'height':'340px'});
			$('.message .wrap .hide').stop().animate({'height':'340px'});
		});
		$('.message .more_bt2').click(function(){
			$('.message .more_bt2').css('display','none');
			$('.message .more_bt1').css('display','block');
			$('.message .wrap').stop().animate({'height':'220px'});
			$('.message .wrap').stop().animate({'height':'220px'});
		});
	
	
	
		

		$('.navi ul li').each(function(){
			
			$(this).children('ul').children('li').eq(-1).children('a').css('border-bottom','0px');
		});
		$('.navi > ul > li').append('<span class="bar"></span>');
});


