document.writeln("<script type='text/javascript' src='../static/js/pooldata.js'></script>");

function register(email, user, password) {
  var userPool = getPoolData();

  var attributeList = [];

  var dataEmail = {
    Name: "email",
    Value: email
  };
  
  var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);
  userPool.signUp(user, password, attributeList, null, function(err, result) {
    if (err) {
        console.log(err.code);
        signUpError(err.code);
        return;
    }    
    cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
    
    signUpSuccess(user);
  });
}

function login(user, password) {
  var userPool = getPoolData();

  var userData = {
    Username: user,
    Pool: userPool
  };

  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

  var authenticationData = {
    Username: user,
    Password: password
  };

  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log("authentication successful!");
      loginSuccess();
    },

    onFailure: function(err) {
      console.log(err);
      loginError(err);
    }
  });
}

function resendConfirmation(user) {
  var userPool = getPoolData();

  var userData = {
    Username: user,
    Pool: userPool
  };

  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.resendConfirmationCode(function(err, result) {
    if (err) {
      alert(err);
      return;
    }
    console.log('call result: ' + result);
  });
}

function confirmRegistration(user, confirmValue) {
  var userPool = getPoolData();

  var userData = {
    Username: user,
    Pool: userPool
  };
  
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.confirmRegistration(confirmValue, true, function(err, result) {
    if (err) {
    	console.log(err);
		verifyError(err);
    }
    else {
    	console.log('call result: ' + result);
        verifySuccess();
    }
  });
}

function logout() {
  var userPool = getPoolData();

  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    console.log('logging out');
    cognitoUser.signOut();
  }
}

function updateEmail(email) {
  var userPool = getPoolData();
  var cognitoUser = userPool.getCurrentUser();
  if (userPool.getCurrentUser() != null) {
    var attributeList = [];
    var attribute = {
      Name: 'email',
      Value: email
    };
    var attribute = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute);
    attributeList.push(attribute);
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return;
      }
    });
    cognitoUser.updateAttributes(attributeList, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }
}

function updatePassword(oldpassword, newpassword) {
  var userPool = getPoolData();
  var cognitoUser = userPool.getCurrentUser();
  if (userPool.getCurrentUser() != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return;
      }
    });
    cognitoUser.changePassword(oldpassword, newpassword, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }
}

/**
 * 
 * @param String user
 * @returns {void}
 */
function forgotPassword(user) {
  var userPool = getPoolData();

  var userData = {
    Username: user,
    Pool: userPool
  };
  
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.forgotPassword({
    onSuccess: function(result) {
      console.log('call result: ' + result);
      forgotPasswordSuccess();
    },
    onFailure: function(err) {
      forgotPasswordError(err);
    },
  });
}

function rememberThisDevice() {
  var userPool = getPoolData();

  var cognitoUser = userPool.getCurrentUser();
  if (userPool.getCurrentUser() != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return;
      }
    });
    cognitoUser.setDeviceStatusRemembered({
      onSuccess: function(result) {
        console.log('call result: ' + result);
      },
      onFailure: function(err) {
        alert(err);
      }
    });
  }
}

function doNotRememberThisDevice() {
  var userPool = getPoolData();

  var cognitoUser = userPool.getCurrentUser();
  if (userPool.getCurrentUser() != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return;
      }
    });
    cognitoUser.setDeviceStatusNotRemembered({
      onSuccess: function(result) {
        console.log('call result: ' + result);
      },
      onFailure: function(err) {
        alert(err);
      }
    });
  }
}

function forgetThisDevice() {
  var userPool = getPoolData();

  var cognitoUser = userPool.getCurrentUser();
  if (userPool.getCurrentUser() != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return;
      }
    });
    cognitoUser.forgetDevice({
      onSuccess: function(result) {
        console.log('call result: ' + result);
      },
      onFailure: function(err) {
        alert(err);
      }
    });
  }
}

function deleteUser() {
  var userPool = getPoolData();

  // A lot of this code seems redudant?
  
  var cognitoUser = userPool.getCurrentUser();
  if (userPool.getCurrentUser() != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return;
      }
    });
    cognitoUser.deleteUser(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }
}


/**
 * Checks for a valid user session.
 * 
 * @param {CognitoUser} NOT ACTUALLY BEING USED ATM
 * @returns {CognitoUser} current user
 */
function getUserSession(user) {
	var userPool = getPoolData();
	return userPool.getCurrentUser();
}
