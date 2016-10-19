/* 
   Simple JQuery Accordion menu.
   HTML structure to use:

   <ul id="menu">
     <li><a href="#">Sub menu heading</a>
     <ul>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       ...
       ...
     </ul>
     <li><a href="#">Sub menu heading</a>
     <ul>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       ...
       ...
     </ul>
     ...
     ...
   </ul>

Copyright 2007 by Marco van Hylckama Vlieg

web: http://www.i-marco.nl/weblog/
email: marco@i-marco.nl

$('#menu li a span').className = (ul.style.display == "none") ? "expanded" : "collapsed";

Free for non-commercial use
*/

function initMenu() {
  $('#menu ul').hide();
  $('#content .left_op').hide();
  $('.search_op').hide();
  $('#menu ul').children('.current').parent().show();
  //$('#menu ul:first').show();
  
  $('#opbt li.menucl').click(
  
    function() {
		$('#menu ul').hide();
	}
  );
   $('#opbt li.menuop').click(
  
    function() {
		$('#menu ul').show();
	}
  );
  
  $('#nav_snb .left_cl').click(
  
    function() {
		$('#nav_snb').hide();
		$('#content').removeClass('op remove').addClass('cl'); 
		$('#content .left_op').show();
	}
  );
    $('#content .left_op').click(
  
    function() {
		$('#nav_snb').show();
		$('#content').removeClass('cl remove').addClass('op');
		$('#content .left_op').hide();
	}
  );

    $('.search_op').click(
  
    function() {
		$('#searchzone').show();
		$('.search_op').hide();
		$('.search_cl').show();
	}
  );  
  $('.search_cl').click(
  
    function() {
		$('#searchzone').hide();
		$('.search_cl').hide();
		$('.search_op').show();
	}
  );


  $('#menu li div').click(
  
    function() {
      var checkElement = $(this).next();
      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
       /* $('#menu ul:visible').slideUp('normal'); */
		checkElement.slideUp('normal');
		
		
		

	    return false;
        }
		var checkElement = $(this).next();
      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
       /* $('#menu ul:visible').slideUp('normal'); */
        checkElement.slideDown('normal');
		
        return false;
        }
      }
    );
  }
  
$(document).ready(function() {initMenu();});

function initMenu2() {
  $('#menu ul.show').show();

  }
  
$(document).ready(function() {initMenu2();});

