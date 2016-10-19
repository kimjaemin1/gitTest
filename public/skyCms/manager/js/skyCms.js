(function ($) {

    jQuery.fn.animInc = function (number, duration) {

        var el = $(this);

        if (duration === 'undefined')
            duration = 1000;

        $({val: 0}).animate({val: number}, {
            duration: duration,
            step: function () {
                el.text(Math.floor(this.val * 10) / 10);
            },
            complete: function () {
                el.text(this.val);
            }
        });
    };

    jQuery.fn.showMsg = function (msg, duration, callbackFunc) {
        var delay = duration !== undefined ? duration : 3000;
        var el = $(this);
        $(el).text(msg);
        setTimeout(function () {
            $(el).text('');
            if (callbackFunc !== undefined)
                callbackFunc();
        }, delay);
    };
    
    jQuery.fn.comma = function (){
        $(this).text($(this).text().split(/(?=(?:\d{3})+(?:\.|$))/g).join(','));  
    };

    jQuery.fn.ajaxFormSubmit = function (opt) {

        var option = {
            msgElement:     $('.msg'),
            successMsg:     '등록되었습니다.',
            errorMsg:       '등록 실패.',
            serverErrorMsg: '서버 에러! 개발사에 문의하세요.',
            successFunc: function() {
                history.back();
            }
        };
        
        if (opt !== undefined)
        {
            option.msgElement       = opt.msgElement !== undefined ? opt.msgElement : option.msgElement;
            option.successMsg       = opt.successMsg !== undefined ? opt.successMsg : option.successMsg;
            option.errorMsg         = opt.errorMsg !== undefined ? opt.errorMsg : option.errorMsg;
            option.serverErrorMsg   = opt.serverErrorMsg !== undefined ? opt.serverErrorMsg : option.serverErrorMsg;
            option.successFunc      = opt.successFunc !== undefined ? opt.successFunc : option.successFunc;
        }
        
       

        $(this).ajaxForm({
            beforeSubmit : function(arr, $form, options){
                 $(option.msgElement).append('<img src="/skyCms/images/loading.gif" width=20 height=20 >');
            },
            success: function (msg) {
                        
                if (msg.result === undefined)
                {
                    $(option.msgElement).showMsg(option.successMsg);
                    option.successFunc();
                }
                    
                switch (msg.result)
                {
                    case 1:                        
                        $(option.msgElement).showMsg(option.successMsg);
                        option.successFunc();
                        break;
                    case 0:
                        $(option.msgElement).showMsg(option.errorMsg);
                        break;
                }
                $(option.msgElement).find('img').remove();
            },
            error: function (e, t, c){
                $(option.msgElement).showMsg(option.serverErrorMsg);
                $(option.msgElement).find('img').remove();
            }
        }).submit();
    };
    
    jQuery.fn.ajaxModify = function (id, data, opt){
        
        var option = {
            url:            './mod/',
            tokenElement:   $('#token'),
            msgElement:     $('.msg'),
            successMsg:     '수정 되었습니다.',
            errorMsg:       '수정 실패.',
            serverErrorMsg: '서버 에러! 개발사에 문의하세요.',
            successFunc: function() {
                history.back();
            }
        }
        
        if (opt !== undefined)
        {
            option.url              = opt.url !== undefined ? opt.url : option.url;
            option.tokenElement     = opt.tokenElement !== undefined ? opt.tokenElement : option.tokenElement;
            option.msgElement       = opt.msgElement !== undefined ? opt.msgElement : option.msgElement;
            option.successMsg       = opt.successMsg !== undefined ? opt.successMsg : option.successMsg;
            option.errorMsg         = opt.errorMsg !== undefined ? opt.errorMsg : option.errorMsg;
            option.serverErrorMsg   = opt.serverErrorMsg !== undefined ? opt.serverErrorMsg : option.serverErrorMsg;
            option.successFunc      = opt.successFunc !== undefined ? opt.successFunc : option.successFunc;
        }
        
        $(option.msgElement).append('<img src="/skyCms/images/loading.gif" width=20 height=20 >');
        
        $.ajax({
            url: option.url + id,
            type: 'POST',
            data: "_token=" + $('#token').val() + data,
            success: function (msg) {
                if (msg.result)
                {
                    $(option.msgElement).showMsg(option.successMsg);
                    option.successFunc();
                }
                else
                    $(option.msgElement).showMsg(option.errorMsg);
                
                $(option.msgElement).find('img').remove();
            },
            error: function (e, t, c) {
                $(option.msgElement).showMsg(option.serverErrorMsg);
                $(option.msgElement).find('img').remove();
            }
        });
    };
    
    jQuery.ajaxModify = jQuery.fn.ajaxModify;
    
    jQuery.fn.ajaxRemove = function (id, opt, data) {
        
        var option = {
            url:            './del/',
            tokenElement:   $('#token'),
            msgElement:     $('.msg'),
            alertMsg:       '정말 삭제하시겠습니까?',
            successMsg:     '삭제 되었습니다.',
            errorNoneMsg:   '선택 되지 않았습니다.',
            errorMsg:       '삭제 실패.',
            serverErrorMsg: '서버 에러! 개발사에 문의하세요.',
            successFunc: function() {
                location.reload();
            }
        }
        
        if (opt !== undefined)
        {
            option.url              = opt.url !== undefined ? opt.url : option.url;
            option.tokenElement     = opt.tokenElement !== undefined ? opt.tokenElement : option.tokenElement;
            option.msgElement       = opt.msgElement !== undefined ? opt.msgElement : option.msgElement;
            option.alertMsg         = opt.alertMsg !== undefined ? opt.alertMsg : option.alertMsg;
            option.successMsg       = opt.successMsg !== undefined ? opt.successMsg : option.successMsg;
            option.errorNoneMsg     = opt.errorNoneMsg !== undefined ? opt.errorNoneMsg : option.errorNoneMsg;
            option.errorMsg         = opt.errorMsg !== undefined ? opt.errorMsg : option.errorMsg;
            option.serverErrorMsg   = opt.serverErrorMsg !== undefined ? opt.serverErrorMsg : option.serverErrorMsg;
            option.successFunc      = opt.successFunc !== undefined ? opt.successFunc : option.successFunc;
        }
        
        if (data === undefined)
            data = '';
        
        if (confirm(option.alertMsg))
        {
            $(option.msgElement).append('<img src="/skyCms/images/loading.gif" width=20 height=20 >');
            
            $.ajax({
                url: option.url + id,
                type: 'POST',
                data: "_token=" + $('#token').val() + data,
                success: function (msg) {
                    switch(msg.result)
                    {
                        case 0:
                            $(option.msgElement).showMsg(option.errorNoneMsg);
                            break;
                        case -1:
                            $(option.msgElement).showMsg(option.errorMsg);  
                            break;
                        default:    
                            $(option.msgElement).showMsg(option.successMsg);
                            option.successFunc();
                            break;
                    }
                    
                    $(option.msgElement).find('img').remove();
                },
                error: function (e, t, c) {
                    $(option.msgElement).showMsg(option.serverErrorMsg);
                    $(option.msgElement).find('img').remove();
                }
            });
        }
    };
    
    jQuery.ajaxRemove = jQuery.fn.ajaxRemove;
    
    jQuery.fn.isKorean = function (str){
        
        check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        
        if (str !== undefined) 
            return check.test(str) ? true : false;         
        
        return check.test($(this).val()) ? true : false; 
        
        
    };
    
    jQuery.isKorean = jQuery.fn.isKorean;

})(jQuery);

function checkedAll(el)
{
    if (el.checked)
        $('input[type=checkbox]').prop('checked', true);
    else
        $('input[type=checkbox]').prop('checked', false);
}

function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}