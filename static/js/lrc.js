$(document).ready(function(){
    resizer($('#top-nav').width(), 962);
    
    if (getUserSession(null) != null) {
    	$('#login').removeClass('btn-primary');
    	$('#login').addClass('btn-success');
    }
    else {
    	$('#login').removeClass('btn-success');
    	$('#login').addClass('btn-primary');
    }
    
	$(window).on('resize', function(){
	    var win = $(this); //this = window
	    screenLen = $('#top-nav').width();
	    elemLen = 962;
	    resizer(screenLen, elemLen);
	});

	// !---------- Button Clicks ----------!
	
	// Tabs
	
    $('.nav-tabs a').click(function(){
        $(this).tab('show');
    });
    
    // Quality Buttons
        
    $('#quality-btns button').click(function(){
    	if (!($(this).hasClass('active'))) {
        	$('.btn-group button').removeClass('active');
        	$(this).addClass('active');
    	}
    	else {
    		$(this).removeClass('active');
    	}
    });
    
    // User Sign In/Up Button
    
    $('#login').click(function() {
    	$('#login').attr('data-target', '');
    	if (getUserSession(null) != null) {
    		logout();
    	}
    	else {
    		$('#loginModal').modal('show');
    	}
    });
    
    // Sign Up Button
    
	$('#btnSignUp').click(function(){
		// Are all of the form inputs filled out?
		if (($('#nul-inputEmail').val().length < 0) || ($('#nul-inputUsername').val().length == 0) || ($('#nul-inputPassword').val().length == 0)) {
			$('#nul-warning').text("You can't leave any fields blank.");
		}
		// Is the email address at least 5 characters and contains an '@'?
		else if (($('#nul-inputEmail').val().length < 5) || !($('#nul-inputEmail').val().includes('@'))) {
			$('#nul-warning').text("Please enter a valid email address.");
		}
		// Is the password at least 8 characters long?
		else if ($('#nul-inputPassword').val().length < 8) { // Work around for InvalidParameterException with passwords < 6 characters.
			$('#nul-warning').text("Passwords must be at least 8 characters in length.");
		}
		// Is there not already a user logged in?
		else if (getUserSession(null) != null) {
			$('#nul-warning').text("User already signed in.");
		}
		else {
			register($('#nul-inputEmail').val(), $('#nul-inputUsername').val(), $('#nul-inputPassword').val());
		}
	});
	
	// Sign In Button
	
	$('#btnSignIn').click(function() {
		// Are all of the form inputs filled out?
		if (($('#ul-inputUsername').val().length == 0) || ($('#ul-inputPassword').val().length == 0)) {
			$('#ul-warning').text("You can't leave any fields blank.");
		}
		// Is the password at least 8 characters long?
		else if ($('#ul-inputPassword').val().length < 8) { // Work around for InvalidParameterException with passwords < 6 characters.
			$('#ul-warning').text("Passwords must be at least 8 characters in length.");
		}
		// Is there not already a user signed in?
		else if (getUserSession() != null) {
			$('#ul-warning').text("There is already a user logged in.");
		}
		else {
			login($('#ul-inputUsername').val(), $('#ul-inputPassword').val());
		}
		
	});
	
	// Switch To Sign In Modal Button
	
	$('#switch-signin').click(function() {
		$('#signup-div').css('display', 'none');
		$('#switch-signin').css('display', 'none');
		clearElement('nul-form', 'form-control');
		$('#signin-div').css('display', 'block');
		$('#switch-signup').css('display', 'inline-block');
	});
	
	// Switch To Sign Up Modal Button
	
	$('#switch-signup').click(function() {
		$('#signin-div').css('display', 'none');
		$('#switch-signup').css('display', 'none');
		clearElement('ul-form', 'form-control');
		$('#signup-div').css('display', 'block');
		$('#switch-signin').css('display', 'inline-block');
	});
	
	// Close Button
	
	$('#close').click(function () {
		closeUserModal();
	});
	
});

/**
 * Takes a parent element and clears class values within.
 * 
 */
function clearElement(element, htmlClass) {
	var elements = document.getElementById(element)
	if (elements == null) {
		console.log("Error in clearElement(element, htmlClass): " + element + " does not exist.");
	}
	else {
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].className == htmlClass) {
				elements[i].value = '';
			}
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
	$('#signin-div').css('display', 'none');
	$('#switch-signup').css('display', 'none');
	clearElement('nul-form', 'form-control');
	$('#signup-div').css('display', 'none');
	$('#switch-signin').css('display', 'none');
	$('#verify-resend').css('display', 'inline-block');
	$('#verify-div').css('display', 'block');
	
	$('#verify-code-btn').click( function() {
		var verificationCode = $('#verify-code-input').val();
		if (verificationCode.length == 0) {
			
		}
		else if (getUserSession(null) != null) {
			closeUserModal();
		}
		else {
			confirmRegistration(user, verificationCode);
		}
	});
	
	$('#verify-resend').click( function() {
		resendConfirmation(user);
	});
}

function verifySuccess() {
	$('#signin-div').css('display', 'block');
	$('#switch-signup').css('display', 'inline-block');
	clearElement('verify-form', 'form-control');
	$('#signup-div').css('display', 'none');
	$('#switch-signin').css('display', 'none');
	$('#verify-resend').css('display', 'none');
	$('#verify-div').css('display', 'none');
	
	$('#ul-warning').text("You successfully verified your email.");
}

function logInSuccess() {
	closeUserModal();
	$('#login').removeClass('btn-primary');
	$('#login').addClass('btn-success');
}

function logInError() {
	$('#ul-warning').text("Login Failed.");
}

function closeUserModal() {
	clearElement('nul-form', 'form-control');
	clearElement('ul-form', 'form-control');
	$('#nul-warning').text('');
	$('#ul-warning').text('');
	$('#loginModal').modal('hide');
}

function resizer(screenLen, elemLen) {
    if (screenLen < 768 )
    {
    	//Navbar Items
    	
    	$('#advanced-search').css('display', 'table');
    	$('#ideo-tabs').css('display', 'none');
    	$('#quality-btns').css('display', 'none');
    	    	
    	//Menu Items
    	
    	$('#legit').css('display', 'block');
    	$('#fake').css('display', 'block');
    	$('#quality-sep').css('display', 'list-item');
    	$('#left').css('display', 'block');
    	$('#right').css('display', 'block');
    	$('#neutral').css('display', 'block');
    	$('#ideo-sep').css('display', 'list-item');
    }
    else if (screenLen < 769 )
	{
    	//Navbar Items
    	
    	$('#advanced-search').css('display', 'table');
    	$('#ideo-tabs').css('display', 'none');
    	$('#quality-btns').css('display', 'none');
    	    	
    	//Menu Items
    	
    	$('#legit').css('display', 'block');
    	$('#fake').css('display', 'block');
    	$('#quality-sep').css('display', 'list-item');
    	$('#left').css('display', 'block');
    	$('#right').css('display', 'block');
    	$('#neutral').css('display', 'block');
    	$('#ideo-sep').css('display', 'list-item');
	}
    else if (screenLen < 932)
    {
    	//Navbar Items
    	
    	$('#advanced-search').css('display', 'table');
    	$('#ideo-tabs').css('display', 'initial');
    	$('#quality-btns').css('display', 'none');
    	    	
    	//Menu Items
    	
    	$('#legit').css('display', 'block');
    	$('#fake').css('display', 'block');
    	$('#quality-sep').css('display', 'list-item');
    	$('#left').css('display', 'none');
    	$('#right').css('display', 'none');
    	$('#neutral').css('display', 'none');
    	$('#ideo-sep').css('display', 'none');
    }
    else
	{
    	//Navbar Items
    	
    	$('#advanced-search').css('display', 'table');
    	$('#ideo-tabs').css('display', 'initial');
    	$('#quality-btns').css('display', 'initial');
    	    	
    	//Menu Items
    	
    	$('#legit').css('display', 'none');
    	$('#fake').css('display', 'none');
    	$('#quality-sep').css('display', 'none');
    	$('#left').css('display', 'none');
    	$('#right').css('display', 'none');
    	$('#neutral').css('display', 'none');
    	$('#ideo-sep').css('display', 'none');
	}
}

