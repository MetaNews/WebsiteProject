$(document).ready(function(){
    resizer($('#top-nav').width(), 962);
    
	$(window).on('resize', function(){
	    var win = $(this); //this = window
	    screenLen = $('#top-nav').width();
	    elemLen = 962;
	    resizer(screenLen, elemLen);
	});
	
	// !---------- Button Clicks ----------!
	
	// Tabs
	
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    
    //Quality Buttons
        
    $("#quality-btns button").click(function(){
    	if (!($(this).hasClass("active"))) {
        	$(".btn-group button").removeClass("active");
        	$(this).addClass("active");
    	}
    	else {
    		$(this).removeClass("active");
    	}
    });
    
    //User Sign In/Up Button
    
    $("#login").click(function() {
    	//Check for user session
    });
    
    //Sign Up Button
    
	$('#btnSignUp').click(function(){
		if (($('#nul-inputEmail').val().length == 0) || ($('#nul-inputEmail').val().length == 0) || ($('#nul-inputPassword').val().length == 0)) {
			$('#nul-warning').text("You can't leave any fields blank.");
		}
		else if ($('#nul-inputPassword').val().length < 8) { //Work around for InvalidParameterException with passwords < 6 characters.
			$('#nul-warning').text("Passwords must be at least 8 characters in length.");
		}
		else {
			register($('#nul-inputEmail').val(), $('#nul-inputUsername').val(), $('#nul-inputPassword').val());
		}
	});
	
	//Switch To Sign In Modal Button
	
	$('#switch-signin').click(function() {
		$('#signup-div').css("display", "none");
		$('#switch-signin').css("display", "none");
		clearForm("nul-form");
		$('#signin-div').css("display", "block");
		$('#switch-signup').css("display", "inline-block");
	});
	
	//Switch To Sign Up Modal Button
	
	$('#switch-signup').click(function() {
		$('#signin-div').css("display", "none");
		$('#switch-signup').css("display", "none");
		clearForm("ul-form");
		$('#signup-div').css("display", "block");
		$('#switch-signin').css("display", "inline-block");
	});
	
	//Sign In Button
	
	$('#btnSignIn').click(function() {
		if (($('#ul-inputUsername').val().length == 0) || ($('#ul-inputPassword').val().length == 0)) {
			$('#ul-warning').text("You can't leave any fields blank.");
		}
		else if ($('#ul-inputPassword').val().length < 6) { //Work around for InvalidParameterException with passwords < 6 characters.
			$('#ul-warning').text("Passwords must be at least 8 characters in length.");
		}
		else {
			login($('#ul-inputUsername').val(), $('#ul-inputPassword').val());
		}
		
	});
	
	//Close Button
	
	$('#close').click(function () {
		clearForm('nul-form');
		clearForm('ul-form');
		$('#nul-warning').text('');
		$('#ul-warning').text('');
	});
	
});

function clearForm(element) {
	var elements = document.getElementById(element)
	
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == "form-control") {
			elements[i].value = "";
		}
	}	
}

function signUpError(err) {
	switch (err) {
		case "UsernameExistsException":
			$('#nul-warning').text('That username already exists.');
			break;
		case "InvalidPasswordException":
			$('#nul-warning').text('Passwords must be at least 8 characters in length.');
			break;
		case "InvalidParameterException":
			$('#nul-warning').text('Please enter a valid email address.'); // This can potentially trigger if the password is less than 6 characters long, for some reason.
			break;
		default:
			$('#nul-warning').text('Unknown error occured: ' + code);
			break;
	}
}

function signUpSuccess(user) {
	$('#signin-div').css("display", "none");
	$('#switch-signup').css("display", "none");
	clearForm("nul-form");
	$('#signup-div').css("display", "none");
	$('#switch-signin').css("display", "none");
	$("#verify-resend").css("display", "inline-block");
	$("#verify-div").css("display", "block");
	
	$("#verify-code-btn").click( function() {
		var verificationCode = $("#verify-code-input").val();
		if (verificationCode.length == 0) {
			
		}
		else {
			confirmRegistration(user, verificationCode);
		}
	});
	
	$("#verify-resend").click( function() {
		resendConfirmation(user);
	});
}

function verifySuccess() {
	$('#signin-div').css("display", "block");
	$('#switch-signup').css("display", "inline-block");
	clearForm("verify-form");
	$('#signup-div').css("display", "none");
	$('#switch-signin').css("display", "none");
	$("#verify-resend").css("display", "none");
	$("#verify-div").css("display", "none");
	
	$('#ul-warning').text("You successfully verified your email.");
}

function resizer(screenLen, elemLen) {
    if (screenLen < 768 )
    {
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table");
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
    	
    	$('#advanced-search').css("display", "table");
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
    	
    	$('#advanced-search').css("display", "table");
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
    	
    	$('#advanced-search').css("display", "table");
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
