///////////////////////////////////// binding script S //////////////////////////////////////////////
$(function(){
	$('a.app_regist_bt').prepend('<span class="bt_icon"></span>');
	$('a.app_regist_bt2').prepend('<span class="bt_icon"></span>');
	$('input.app_regist_bts').prepend('<span class="bt_icon"></span>');
	$('input.app_regist_bts2').prepend('<span class="bt_icon"></span>');
	$('.apps_tap ul li a').eq(-1).css('border-right','solid 1px #c8c8c8');
})

$(function(){
	////////////////// index script S////////////////////	

	//메인이미지 등록 스크립트
	$('.apps_bt2').toggle(function(){
		$('.mainImgAdd').css('display','inline-block');
	}, function(){  
		$('.mainImgAdd').css('display','none');
	});

	//메인 포럼리스트 체크 스크립트
	$('.forum_list li span').find('.checkinput').parent().parent().children('.layout').removeClass("selected");
	$('.forum_list li span').find('.checkinput:checked').parent().parent().children('.layout').addClass("selected");

	//비활성버튼 css 수정
	$('.forum_list li span').find('.checkinput').parent().css('background','#ffffff');
	$('.forum_list li span').find('.checkinput').parent().children('a').css('color','#000000');

	//활성버튼 css 수정
	$('.forum_list li span').find('.checkinput:checked').parent().css('background','#86b739');
	$('.forum_list li span').find('.checkinput:checked').parent().children('a').css('color','#ffffff');
	
	//활성테두리 클릭시 체크박스 체크하기
	$('.check').click(function(){
		var forum_id = $(this).parent().children('#forum_id').val();
		var clickCehck = $(this).parent().children('.check').children('input').is(':checked');
		
		listCheck(clickCehck,forum_id);
	
			if(clickCehck){
				$(this).parent().children('.check').children('input').removeAttr('checked');
			}else{
				$(this).parent().children('.check').children('input').attr('checked', 'checked');
			}
	})

	////////////////// index script E////////////////////	

	////////////////// schedule script S////////////////////	

	$('.scheduleTimeEdit').toggle(function(){
		var timeTxt = $(this).parent().parent().children('span').eq(0).text();

		trimtxt = timeTxt.replace(/ /g, '');
		trimtxt = trimtxt.split("~");
		startTime = trimtxt[0];
		endTime = trimtxt[1];

		startTime = startTime.split(":");
		endTime = endTime.split(":");

		startHour = startTime[0];
		startMinute = startTime[1];

		endHour = endTime[0];
		endMinute = endTime[1];

		$(this).text('완료');
		$(this).parent().parent().children('span').eq(0).html('<select name="time_start">' + timeSelect(startHour) + '</select> <select name="time_start">' + minuteSelect(startMinute) + '</select> - <select name="time_start">' + timeSelect(endHour) + '</select> <select name="time_start">' + minuteSelect(endMinute) + '</select>');

	},function(){ 
		$(this).text('수정');
		var time_id = $(this).parent().parent().children('input[name=time_id]').val();
		var forum_id = $('form[name=timeform]').eq(0).children('input[name=forum_id]').val();
		startHour = $(this).parent().parent().children('span').eq(0).children('select').eq(0).val();
		startMinute = $(this).parent().parent().children('span').eq(0).children('select').eq(1).val();
		endHour = $(this).parent().parent().children('span').eq(0).children('select').eq(2).val();
		endMinute = $(this).parent().parent().children('span').eq(0).children('select').eq(3).val();
		$(this).parent().parent().children('span').eq(0).text(startHour + ' : ' + startMinute + ' ~ ' + endHour + ' : ' + endMinute);

		$.ajax({
			url : "/manager/app/schedule/schedule_time_edit_ok.sky?time_id=" + time_id + "&startHour=" + startHour + "&startMinute=" + startMinute + "&endHour=" + endHour + "&endMinute=" + endMinute + "&forum_id=" + forum_id,
			type : "GET",
			success : function(msg) {
			},
			error : function(error) {
				alert('실패했습니다. 새로고침 후 다시 시도해 주십시오.');
			}
		});
	});
	
	////////////////// schedule script E////////////////////	
		
})

///////////////////////////////////// binding script E //////////////////////////////////////////////

///////////////////////////////////// index script S //////////////////////////////////////////////

//리스트 체크 
function listCheck(checkData, forum_id){
	var checkVal = checkData;

	if(checkVal){
		checkVal = "N"
	}else{
		checkVal = "Y"
	}

	$.ajax({
		url : "/manager/app/checkChange.sky?forum_id=" + forum_id + "&checkVal=" + checkVal,
		//data : "id=" + id,
		type : "GET",
		success : function(msg) {
			var txtBox = $('.forum_list li span').find('.checkinput:checked').parent().children('.fillCheck').parent();
			var txtBoxBack = $('.forum_list li span').find('.checkinput').parent().children('.fillCheck').parent();
			//메뉴 배경클래스 제거 및 삽입
			$('.forum_list li span').find('.checkinput').parent().parent().children('.layout').removeClass("selected");
			$('.forum_list li span').find('.checkinput').parent().children('.checkinput').val("Y")
			$('.forum_list li span').find('.checkinput:checked').parent().parent().children('.layout').addClass("selected");
			$('.forum_list li span').find('.checkinput:checked').parent().children('.checkinput').val("Y")

			//비활성버튼 css 수정
			$('.forum_list li span').find('.checkinput').parent().children('.fillCheck').html('비활성화')
			txtBoxBack.css('background','#ffffff');
			txtBoxBack.children('a').css('color','#000000');

			//활성버튼 css 수정
			$('.forum_list li span').find('.checkinput:checked').parent().children('.fillCheck').html('활성화')
			txtBox.css('background','#86b739');
			txtBox.children('a').css('color','#ffffff');
			

		},
		error : function(error) {
		}
	
	});
}

///////////////////////////////////// index script E //////////////////////////////////////////////

///////////////////////////////////// program script S //////////////////////////////////////////////

//파일폼 추가 
function addFunction(code){
	$(code).removeAttr('onchange');
	$(code).css('width','620px');
	$(code).parent().append('<a class="addCt fileDelBtn" onclick="fileDelBtn()" style="cursor:pointer; right:3px; top:7px; padding: 7px 6px;">삭제</a>');
	$(code).parent().css('border-bottom','0');
	$(code).parent().parent().append('<li class="Announcement" ><span></span>' +
							'<input type="file" name="upFile" id="upFile" class="apps_input" onchange="addFunction(this)" style="width:666px;">' +
						'</li>');
	//$('.fileUpForm').css('margin-bottom','5px');
	//$('.fileUpForm').parent().append('<input type="file" style="display:block;width:666px;" onchange="addFunction(this)" name="upFile" id="upFile" class="apps_input fileUpForm">');
}

function fileDelBtn(){
	$(".fileDelBtn").live("click", function(){
		$(this).parent().remove();
		$(this).parent().children('.fileDelBtn').children('span').html('');
		$('.Announcement').parent().children('.Announcement').eq(0).children('span').text('');
		$('.Announcement').parent().children('.Announcement').eq(0).children('span').text('발표자료');
	})
}

function addTr(){
	var ct_titleS = $('input[name=ct_titleS]');
	var ct_contentsS = $('textarea[name=ct_contentsS]');
	
	if(ct_titleS.val().length > 0 && ct_contentsS.val().length > 0){
		ct_titleS.removeAttr('onblur');
		ct_contentsS.removeAttr('onblur');
		ct_titleS.attr('name','ct_title');			
		ct_contentsS.attr('name','ct_contents');		
		ct_contentsS.css('width','620px');
		ct_contentsS.parent().css('border-bottom','1px dotted #d8d8d8');
		ct_contentsS.parent().append('<a class="addCt addTrDel" style="cursor:pointer; right:3px; top:7px; padding: 7px 6px;" onclick="addTrDel()" >삭제</a>');
		
		$('.program_ct_add').parent().append('<li class="program_ct_add">'+
															'<span style="top:7px; background:none;">'+
																'<input type="text" name="ct_titleS" class="apps_input" style="width:80px;" onblur="addTr()"/>'+
															'</span>'+
															'<textarea name="ct_contentsS" rows="5"  class="apps_input" onblur="addTr()" style="width:666px"></textarea>'+
															'</li>');
		}
}

function addTrDel(){
	$(".addTrDel").live("click", function(){
		$(this).parent().remove();
		$(this).parent().children('.addTrDel').children('span').html('');
	})
}

///////////////////////////////////// speakers script S //////////////////////////////////////////////

//주요경력 추가 
function add_position(){
	var career_start_dts = $('input[name=career_start_dts]');
	var career_end_dts = $('input[name=career_end_dts]');
	var career_names = $('input[name=career_names]');
	
	if(career_start_dts.val().length > 0 && career_names.val().length > 0){
		career_start_dts.removeAttr('onblur');
		career_end_dts.removeAttr('onblur');
		career_names.removeAttr('onblur');
		career_start_dts.attr('name','career_start_dt');			
		career_end_dts.attr('name','career_end_dt');			
		career_names.attr('name','career_name');			
		career_names.css('width','200px');	
		career_names.parent().css('border-bottom','1px dotted #d8d8d8');
		career_names.parent().append('<a class="addCt positionDel" style="cursor:pointer; right:23px; padding: 7px 6px;" onclick="positionDel()" >삭제</a>');

		$('.spk_positions').parent().append(
			'<li class="spk_positions" style="border-bottom:0;"><span></span>'+
				'<input type="text" name="career_start_dts" class="apps_input datepicker" style="width:80px;" onblur="add_position()"  /> - '+
				'<input type="text" name="career_end_dts" class="apps_input datepicker" style="width:80px;" onblur="add_position()" /> '+
				'<input type="text" name="career_names" class="apps_input" style="width:245px;" onblur="add_position()" />'+
			'</li>'
		);
	}
}

//경력 삭제 
function positionDel(){
	$(".positionDel").live("click", function(){
		$(this).parent().remove();
		$('.spk_positions').parent().children('.spk_positions').children('span').html('');
		$('.spk_positions').parent().children('.spk_positions').eq(0).children('span').html('주요 경력');
		
	})
}
		
//세션 검색창 오픈
function sessionWindowOpen(forum_id){
	window.open( "program_list.sky?forum_id=" + forum_id,"프로그램 선택",'scrollbars=yes, width=700, height=500'+
						'resizable=yes,left=250,top=150');
}

//세션 삭제
function spkSessionDel(){
	$(".spkSessionDel").live("click", function(){
		$(this).parent().remove();
		$('.addSession').parent().children('.addSession').children('span').html('');
		$('.addSession').parent().children('.addSession').eq(0).children('span').html('세션');
		
	})
}

///////////////////////////////////// speakers script E //////////////////////////////////////////////

///////////////////////////////////// schedule script S //////////////////////////////////////////////

//스케줄 등록 스크립트
function scheduleSubmit(formNum,dateNum){
	$('#timeform'+formNum).append('<input type="hidden" value="' + formNum + '" name="scheduleNum" >'); 
	$('#timeform'+formNum).append('<input type="hidden" value="' + dateNum + '" name="forum_start_dt" >'); 
	$('#timeform'+formNum).submit();
}

//스케줄 삭제 스크립트
function timeDel(schedule_id,schedule_day,time_id,forum_id){
//	if(confirm('삭제하시겠습니까?')){
//		location.replace ("schedule_del_ok.sky?schedule_id=" + schedule_id + "&schedule_day=" + schedule_day + "&time_id=" + time_id + "&forum_id=" + forum_id);
//	}
	$.ajax({
		url : '/manager/app/schedule/timeProgramCheck.sky?schedule_id=' + schedule_id + '&schedule_day=' + schedule_day + '&time_id=' + time_id + '&forum_id=' + forum_id,
		//data:asd,
		type:"get",
		success : function(msg) {
			if(msg > 0){
				alert('삭제하려는 시간에 등록된 프로그램이 있습니다. ');
			}else{
				location.replace ("schedule_del_ok.sky?schedule_id=" + schedule_id + "&schedule_day=" + schedule_day + "&time_id=" + time_id + "&forum_id=" + forum_id);
			}
		},
		error : function(error){
		
		}
	});
	
}

function scheduleTimeSelect(Code){
	var selectCode = $(Code);
	var selectVal = $(Code).val();
	var schedule_id =  $(Code).parent().parent().parent().children('input[name=schedule_id]').val();

	$.ajax({
		url : "/manager/app/program/changeTimeList.sky?schedule_id=" + schedule_id + "&schedule_day=" + selectVal,
		//data : "id=" + id,
		type : "GET",
		success : function(msg) {
			$(selectCode).parent().children('select[name=time_id]').html(msg);
		},
		error : function(error) {
		}
	
	});

}

function timeSelect(txtHour){
	var time_start;
	for (var i = 6; i < 23; i++) {
		(i < 10 ? a='0'+i : a=i);
		if(txtHour == a){
			shSelected='selected="selected"';
		}else
			shSelected = ""

		time_start += '<option value="' + a + '" ' + shSelected + '>' + a + '</option>'
	}
	return time_start;
}

function minuteSelect(txtMinute){
	var time_start;
	for (var i = 0; i < 60; i+=10) {
		(i < 10 ? a='0'+i : a=i);
		if(txtMinute == a){
			shSelected='selected="selected"';
		}else
			shSelected = ""

		time_start += '<option value="' + a + '" ' + shSelected + '>' + a + '</option>'
	}
	return time_start;
}
///////////////////////////////////// schedule script E //////////////////////////////////////////////

///////////////////////////////////// submit script S  //////////////////////////////////////////////

//forum write submit script 
function CourseWriteSubmit(){
	var form = document.regForm;
	form.submit();
}

//forum edit submit script 
function forumEditSubmit(){
	var form = document.regForm;
	form.submit();
}

//program write submit script 
function programWriteSubmit(){
	var form = document.regForm;
	form.submit();
}

//conference write submit script 
function conferWriteSubmit(){
	var form = document.regForm;
	form.submit();
}

//conference edit submit script 
function conEditSubmit(){
	var form = document.regForm;
	form.submit();
}

//speakers edit submit script 
function forumEditSubmit(){
	var form = document.regForm;
	form.submit();
}

//speakers edit submit script 
function forumEditSubmit(){
	var form = document.regForm;
	form.submit();
}

///////////////////////////////////// submit script E  //////////////////////////////////////////////

///////////////////////////////////// delete script S  //////////////////////////////////////////////

function conDelBtn(file_group_id,conference_id,forum_id){
	if(confirm('삭제하시겠습니까?')){
		location.replace ("conference_del_ok.sky?file_group_id=" + file_group_id + "&conference_id=" + conference_id + "&forum_id=" + forum_id	);
	};
}

function imgDelBtn(file_id, id){
	if(confirm('삭제하시겠습니까?')){
		location.replace ("file_del_ok.sky?file_id=" + file_id + "&id=" + id);
	};
}

function courseDel(id,file_group_id){
	if(confirm('삭제하시겠습니까?')){
		location.replace ("Course_del_ok.sky?id=" + id + "&file_group_id=" + file_group_id);
	};
}

function pressDel(num, page){
	if(confirm('삭제하시겠습니까?')){
		location.replace ("press_del_ok.sky?num=" + num + "&page=" + page);
	};
}

function participantDel(id, page){
	if(confirm('삭제하시겠습니까?')){
		location.replace ("participant_del_ok.sky?id=" + id + "&page=" + page);
	};
}

///////////////////////////////////// delete script E  //////////////////////////////////////////////

$(document).ready(function(){
	$('a.app_regist_bt').prepend('<span class="bt_icon"></span>');
	$('a.app_regist_bt2').prepend('<span class="bt_icon"></span>');
	$('input.app_regist_bts').prepend('<span class="bt_icon"></span>');
	$('input.app_regist_bts2').prepend('<span class="bt_icon"></span>');
	$('.apps_tap ul li a').eq(-1).css('border-right','solid 1px #c8c8c8');
});
