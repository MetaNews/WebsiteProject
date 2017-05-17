$(document).ready(function(){
    resizer($('#top-nav').width(), 962);
    
	$(window).on('resize', function(){
	    var win = $(this); //this = window
	    screenLen = $('#top-nav').width();
	    elemLen = 962;
	    resizer(screenLen, elemLen);
	});
	
	// Button Clicks
	
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
        
    $("#quality-btns button").click(function(){
    	if (!($(this).hasClass("active"))) {
        	$(".btn-group button").removeClass("active");
        	$(this).addClass("active");
    	}
    	else {
    		$(this).removeClass("active");
    	}
    });
    
	$('#btnSignUp').click(function(){
		if (($('#inputEmail').val().length == 0) || ($('#inputEmail').val().length == 0) || ($('#inputPassword').val().length == 0)) {
			$('#nul-warning').text("You can't leave any fields blank.");
		}
		else if ($('#inputPassword').val().length < 6) { //Work around for InvalidParameterException with passwords < 6 characters.
			$('#nul-warning').text("Passwords must be at least 8 characters in length.");
		}
		else {
			register($('#inputEmail').val(), $('#inputUsername').val(), $('#inputPassword').val());
			clearform('nul-form');
		}
	});
	
	$('#nul-close').click(function () {
		clearform('nul-form');
		$('#nul-warning').text('');
	});
	
});

function clearform(element) {
	var elements = document.getElementById(element)
	
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == "form-control") {
			elements[i].value = "";
		}
	}	
}

function resizer(screenLen, elemLen) {
    if (screenLen < 768 )
    {
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "none");
    	$('#quality-btns').css("display", "none");
    	
    	// $('#top-nav-wrapper').css("height", 110);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "block");
    	$('#fake').css("display", "block");
    	$('#quality-sep').css("display", "list-item");
    	$('#left').css("display", "block");
    	$('#right').css("display", "block");
    	$('#neutral').css("display", "block");
    	$('#ideo-sep').css("display", "list-item");
    }
    else if (screenLen < 769 )
	{
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "none");
    	$('#quality-btns').css("display", "none");
    	
    	// $('#top-nav-wrapper').css("height", 60);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "block");
    	$('#fake').css("display", "block");
    	$('#quality-sep').css("display", "list-item");
    	$('#left').css("display", "block");
    	$('#right').css("display", "block");
    	$('#neutral').css("display", "block");
    	$('#ideo-sep').css("display", "list-item");
	}
    else if (screenLen < 932)
    {
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "initial");
    	$('#quality-btns').css("display", "none");
    	
    	// $('#top-nav-wrapper').css("height", 60);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "block");
    	$('#fake').css("display", "block");
    	$('#quality-sep').css("display", "list-item");
    	$('#left').css("display", "none");
    	$('#right').css("display", "none");
    	$('#neutral').css("display", "none");
    	$('#ideo-sep').css("display", "none");
    }
    else
	{
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "initial");
    	$('#quality-btns').css("display", "initial");
    	
    	// $('#top-nav-wrapper').css("height", 60);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "none");
    	$('#fake').css("display", "none");
    	$('#quality-sep').css("display", "none");
    	$('#left').css("display", "none");
    	$('#right').css("display", "none");
    	$('#neutral').css("display", "none");
    	$('#ideo-sep').css("display", "none");
	}
}
