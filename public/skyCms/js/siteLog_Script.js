
function CommongetXMLHttpRequestfunc() {
    var CmnXmlHttp = false;

    if (window.XMLHttpRequest) {   // IE를 제외한 웹브라우저인 경우
        CmnXmlHttp = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {                   // IE인 경우
            try {
                CmnXmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                CmnXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            CmnXmlHttp = null;
        }
    }
    return CmnXmlHttp;
}

function CommonXMLMainStartings(tmpurlstr) {

    var cmnresulttmpstr;

    var Cmnxmlmainhttp = CommongetXMLHttpRequestfunc();

    Cmnxmlmainhttp.open("GET", tmpurlstr, false);
    Cmnxmlmainhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Cmnxmlmainhttp.onreadystatechange = function ()
    {
        if (Cmnxmlmainhttp.readyState == 4 && Cmnxmlmainhttp.status == 200) {

            cmnresulttmpstr = Cmnxmlmainhttp.responseText;
            if (String(cmnresulttmpstr) != "") {
                cmnresulttmpstr = true;
            } else {
                cmnresulttmpstr = false;
            }
        } else {
            cmnresulttmpstr = false;
        }

    }

    Cmnxmlmainhttp.send(null);

    return cmnresulttmpstr;
}


function CommonXMLMainGetReturnValueStartings(tmpurlstr) {

    var cmnresulttmpstr = null;

    var Cmnxmlmainvaluehttp = CommongetXMLHttpRequestfunc();

    Cmnxmlmainvaluehttp.open("GET", tmpurlstr, false);
    Cmnxmlmainvaluehttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Cmnxmlmainvaluehttp.onreadystatechange = function ()
    {
        if (Cmnxmlmainvaluehttp.readyState == 4 && Cmnxmlmainvaluehttp.status == 200) {
            cmnresulttmpstr = Cmnxmlmainvaluehttp.responseText;
        } else {
            cmnresulttmpstr = null;
        }

    }
    Cmnxmlmainvaluehttp.send(null);

    return cmnresulttmpstr;
}

function CommonXMLMainPostReturnValueStartings(tmpurlstr, tmpValue) {

    var cmnresulttmpstr = null;

    var Cmnxmlmainvaluehttp = CommongetXMLHttpRequestfunc();

    Cmnxmlmainvaluehttp.open("POST", tmpurlstr, false);
    Cmnxmlmainvaluehttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Cmnxmlmainvaluehttp.onreadystatechange = function ()
    {
        if (Cmnxmlmainvaluehttp.readyState == 4 && Cmnxmlmainvaluehttp.status == 200) {
            cmnresulttmpstr = Cmnxmlmainvaluehttp.responseText;
        } else {
            cmnresulttmpstr = null;
        }

    }
    Cmnxmlmainvaluehttp.send(tmpValue);

    return cmnresulttmpstr;
}
// 비동기모드 통신 스크립트 End ==================================================================



// 회원 새로고침 시작 부분 Start ======================================================================== 
//setTimeout("CommonXMLMainStartings('/include/mmem_chks.sky')",600000);
// 회원 새로고침 시작 부분 End ==========================================================================

// 방문자정보 처리부분 Start ============================================================================
CommonXMLMainStartings("/sky/log/");
// 방문자정보 처리부분 End ==============================================================================
