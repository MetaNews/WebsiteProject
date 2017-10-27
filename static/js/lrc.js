$(document).ready(function() {
    resizer($('#top-nav').width(), 962);
    
    // Update Login Button Color
    
    updateUserButton();
    
    populateArticles();
    
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
        
    $('#quality-btns button').click(function() {
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
    		updateUserModal();
    		$('#userModal').modal('show');
    	}
    	else {
    		showSignup();
    		$('#loginModal').modal('show');
    	}
    });
    
    // Sign Out Button
    
    $('#signout-user').click(function() {
    	if (getUserSession(null) != null) {
    		logout();
    	}
    	else {
    		alert("User Session Not Found.");
    	}
    	updateUserButton();
		$('#userModal').modal('hide');

    });
    
    // Sign Up Button
    
	$('#btnSignUp').click(function(){
		$('#nul-warning').text('');
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
		$('#nul-inputPassword').text('');
	});
	
	// Sign In Button
	
	$('#btnSignIn').click(function() {
		$('#ul-warning').text('');
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
		$('#ul-inputPassword').val('');
	});
	
	// Switch to forgot PW modal button
	
	$('#forgotpw-switch').click(function() {
		showForgotPW();
	});
	
	// Forgot password Button
	
	$('#forgotpw-button').click(function() {		
		if ($('#forgotpw-input').val().length < 1) {
			$('#forgotpw-warning').text('Please enter your username.');
		}
		else {
			$('#forgotpw-warning').text('');
			forgotPassword($('#forgotpw-input').val());
		}
	});
	
	// Switch To Sign In Modal Button
	
	$('#switch-signin').click(function() {
		showSignin();
	});
	
	// Switch To Sign Up Modal Button
	
	$('#switch-signup').click(function() {
		showSignup();
	});
	
	// Log In/Up Close Button
	
	$('#login-close').click(function() {
		closeLoginModal();
	});
	
	// Delete User Button
	
	$('#deleteuser-btn').click(function() {
		deleteUser();
		// updateUserButton();
		$('#userModal').modal('hide');
	})
	
});

function populateArticles() {
	var apigClient = apigClientFactory.newClient();
	var params = {};
	var body = {};
	var additionalParams = {};
	apigClient.initialgetarticlesGet(param, body, additionalParams)
		.then(function(result) {
			for (i in result.data.Items) {
				document.getElementById('article-area').innerHTML += 
					'<div class="shadow-container article-container">' +
					'<div class="arrow-box"><div class="left-arrow">' +
					'<a href="#"><span class="glyphicon glyphicon-chevron-left">' +
					'</span></a></div><div class="up-down-arrows-wrapper">' +
					'<ul class="list-group up-down-arrows"><li><a href="#" >' +
					'<span class="glyphicon glyphicon-chevron-up"></span></a>' +
					'<li>0</li><li><a href="#" ><span class="glyphicon glyphicon-chevron-down">' +
					'</span></a></ul></div><div class="right-arrow">' +
					'<a href="#"><span class="glyphicon glyphicon-chevron-right">' +
					'</span></a></div><div class="veri-icon"><a href="#verify">' +
					'<span class="glyphicon glyphicon-ok-sign"></span></a></div>' +
					'<div class="ideo-icon"><a href="#ideo"><span class=""></span>' +
					'</a></div><div class="comment-icon"><a href="#comment">' +
					'<span class="glyphicon glyphicon-circle-arrow-left"></span>' +
					'</a></div><div class="info-icon"><a href="#info"><span></span>' +
					'</a></div></div><div class="article-box container-fluid">' +
					'<div class="article-title"><a href="' + result.data.items[i].url + '">' +
					'Article Title Not Yet Supported. </a><hr></div></div><div class="info-box">' +
					'<ul class="list-inline block-list"><li><a href="#">' + result.data.items[i].website +
					'</a></li><li><a href="#">' + result.data.items[i].author + '</a></li>' +
					'<li style="float:right;"><a href="article.html">0 ' +
					'<span class="glyphicon glyphicon-comment"></span></a>' +
					'<li class="article-tag"><a data-toggle="modal" data-target="#tagModal">' +
					'Clickbait</a></li><li class="article-tag"><a data-toggle="modal" ' +
					'data-target="#tagModal">Misleading Title</a></li></ul></div></div>';
			}
	});
}

/**
 * Takes a parent element and clears class values within.
 * 
 * @param String element the id of the form element
 * @param String htmlClass the class
 * @returns {void}
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

/**
 * Called when there is some error with the sign up. Displays the 
 * proper warning.
 * 
 * @param Error err
 * @returns {void}
 */
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

/**
 * Called when a user has successfully added a username, email,
 * and password, and a verification email has been sent to them. Allows
 * them to verify their email.
 * 
 * @param {CognitoUser} user 
 * @returns {void}
 */
function signUpSuccess(user) {
	showVerify();
	
	$('#verify-code-btn').click( function() {
		var verificationCode = $('#verify-code-input').val();
		if (verificationCode.length == 0) {
			
		}
		else if (getUserSession(null) != null) {
			closeLoginModal();
		}
		else {
			confirmRegistration(user, verificationCode);
		}
	});
	
	$('#verify-resend').click( function() {
		resendConfirmation(user);
	});
}

/**
 * Called when the user has just succesfully verified their email. It
 * displays the signin view of the login modal.
 * 
 * @returns {void}
 */
function verifySuccess() {
	showSignin();
	$('#ul-warning').text("You have successfully verified your email.");
}

/**
 * Called when login is succesful. Hides the login modal, and 
 * updates the user button.
 * 
 * @returns {void}
 */
function loginSuccess() {
	closeLoginModal();
	updateUserButton();
}

/**
 * Called when something is causing a login error. Displays the
 * appropriate error message or allows a user to verify their email.
 * 
 * @param {nodeCallback<String>} err error message
 * @returns {void}
 */
function loginError(err) {
	switch (err.code) {
		case "UserNotFoundException":
			$('#ul-warning').text(err.message);
			break;
		case "UserNotConfirmedException":
			$('#ul-warning').text(err.message);
			break;
		case "NotAuthorizedException":
			$('#ul-warning').text(err.message);
			break;
		default:
			alert(err);
			break;
	}
}

/**
 * Called when there is some error preventing an inputted verification
 * code from activating an account.
 * 
 * @param {Error} err
 * @returns {void}
 */
function verifyError(err) {
	$('#verify-warning').text(err.message);
}

/**
 * Called when the user makes a successful request to reset their
 * password.
 * 
 * @returns {void}
 */
function forgotPasswordSuccess() {
	
}

/**
 * Called when something is preventing a user from reseting their password.
 * Shows the appropriate error message.
 * 
 * @param Error err
 * @returns {void}
 */
function forgotPasswordError(err) {
	console.log(err);
	$('#forgotpw-warning').text("");
}

/**
 * Clears forms and warnings, and then hides the login modal.
 * 
 * @returns {void}
 */
function closeLoginModal() {
	$('#loginModal').modal('hide');
	emptyLoginModal();
}

/**
 * Adds user values to the user modal.
 * 
 * @returns {void}
 */
function updateUserModal() {
	var User = getUserSession(null);
	if (User != null) {
		$('#username-h4').text("User: " + User.getUsername());
	}
}

/**
 * Changes the user button to the appropriate type - blue
 * if no user is logged in, green otherwise.
 * 
 * @returns {void}
 */
function updateUserButton() {
    if (getUserSession(null) != null) {
    	$('#login').removeClass('btn-primary');
    	$('#login').addClass('btn-success');
    }
    else {
    	$('#login').removeClass('btn-success');
    	$('#login').addClass('btn-primary');
    }
}

/**
 * Hides and clears all of the nonessential buttons/forms within
 * the Login Modal - signin, signup, and verify.
 * 
 * @returns {void}
 */
function emptyLoginModal() {
	// Empty sign up
	clearElement('nul-form', 'form-control');
	$('#signup-div').css('display', 'none');
	$('#switch-signin').css('display', 'none');
	$('#nul-warning').text('');
	
	// Empty sign in
	clearElement('ul-form', 'form-control');
	$('#signin-div').css('display', 'none');
	$('#switch-signup').css('display', 'none');
	$('#ul-warning').text('');
	
	// Empty verify email
	clearElement('verify-form', 'form-control');
	$('#verify-resend').css('display', 'none');
	$('#verify-div').css('display', 'none');
	$('#verify-warning').text('');
	
	// Empty forgotpw
	clearElement('forgotpw-form', 'form-control');
	$('#forgotpw-div').css('display', 'none');
	$('#forgotpw-switch').css('display', 'none');
	$('#forgotpw-warning').text('');
}

/**
 * Switches the login modal to the signin view.
 *  
 * @returns {void}
 */
function showSignin() {
	emptyLoginModal();
	$('#signin-div').css('display', 'block');
	$('#switch-signup').css('display', 'inline-block');
	$('#forgotpw-switch').css('display', 'inline-block');
}

/**
 * Switches the login modal to the signup view.
 * 
 * @returns {void}
 */
function showSignup() {
	emptyLoginModal();
	$('#signup-div').css('display', 'block');
	$('#switch-signin').css('display', 'inline-block');
}

/**
 * Switches the login modal to the verify view.
 * 
 * @returns {void}
 */
function showVerify() {
	emptyLoginModal();
	$('#verify-resend').css('display', 'inline-block');
	$('#verify-div').css('display', 'block');
}

/**
 * Switches the login modal to the forgotpw view.
 * 
 * @returns {void}
 */
function showForgotPW() {
	emptyLoginModal();
	$('#forgotpw-div').css('display', 'block');
	$('#switch-signin').css('display', 'inline-block');
}

function resizer(screenLen, elemLen) {
    if (screenLen < 736 )
    {
    	//Navbar Items
    	
    	$('#advanced-search').css('display', 'table');
    	$('#ideo-tabs').css('display', 'none');
    	$('#quality-btns').css('display', 'none');
    	    	
    	//Menu Items
    	
    	$('#legit').css('display', 'none');
    	$('#fake').css('display', 'none');
    	$('#quality-sep').css('display', 'list-item');
    	$('#left').css('display', 'block');
    	$('#right').css('display', 'block');
    	$('#neutral').css('display', 'block');
    	$('#ideo-sep').css('display', 'list-item');
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

