
// 새창 띄우기 스크립트1 STart ==========================================================
	function popup_viewerwindow(name,tmpwidth,tmpheight,tmpleft,tmptop,tmpscroll,tmpsizeyesno){
		 window.open(name,"up_viewerwindow",'width='+tmpwidth+',height='+tmpheight+',marginwidth=0,marginheight=0,border=0,left='+tmpleft+', top='+tmptop+', scrollbars='+tmpscroll+',resizable='+tmpsizeyesno+'');
	}
	// 새창 띄우기 스크립트1 End =============================================================
	
	// 메뉴별 쿠키 추출 start =============================================================
	
	/**
	 * 쿠키값 추출
	 * @param cookieName 쿠키명
	 */
	function getCookie( cookieName )
	{
		var search = cookieName + "=";
		var cookie = document.cookie;

		// 현재 쿠키가 존재할 경우
		if( cookie.length > 0 )
		{
			// 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
			startIndex = cookie.indexOf( cookieName );
			
			alert(cookie);

			// 만약 존재한다면
			if( startIndex != -1 )
			{
				// 값을 얻어내기 위해 시작 인덱스 조절
				startIndex += cookieName.length;

				// 값을 얻어내기 위해 종료 인덱스 추출
				endIndex = cookie.indexOf( ";", startIndex );

				// 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
				if( endIndex == -1) endIndex = cookie.length;

				// 쿠키값을 추출하여 리턴
				return unescape( cookie.substring( startIndex + 1, endIndex ) );
			}
			else
			{
				// 쿠키 내에 해당 쿠키가 존재하지 않을 경우
				return false;
			}
		}
		else
		{
			// 쿠키 자체가 없을 경우
			return false;
		}
	}

	/**
	 * 쿠키 설정
	 * @param cookieName 쿠키명
	 * @param cookieValue 쿠키값
	 * @param expireDay 쿠키 유효날짜
	 */
	function setCookie( cookieName, cookieValue, expireDate )
	{
		var today = new Date();
		today.setDate( today.getDate() + parseInt( expireDate ) );
		document.cookie = cookieName + "=" + escape( cookieValue ) + "; path=/; expires=" + today.toGMTString() + ";"
	}

	
	/**
	 * 자신이 지정한 값으로 쿠키 설정
	 */
	function setMyCookie(coCode,coVal)
	{
		//setCookie( form.setName1.value, form.setValue1.value, form.expire1.value );
		setCookie( coCode, coVal, 1 );
		//viewCookie(); // 전체 쿠키 출력 갱신
	  // alert(coVal);
	}

   function notice_setCookie( name, value, expiredays ) {
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}
	
// 메뉴별 쿠키 추출 end =============================================================
function notice_closeWin(tmpid,tmpform,tmplimittime) 
	{ 
			console.log(tmplimittime);

			if ( tmpform.checked == true) {
				notice_setCookie( String(tmpid), "done" , tmplimittime); // 1=하룻동안 공지창 열지 않음
			}
			window.close(); 
	}
	
	
	function opener_urlstrreplaces(tmpurlstr){
	
		 window.opener.location.replace(tmpurlstr);
	
	}