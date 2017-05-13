document.writeln("<script type='text/javascript' src='./static/js/pooldata.js'></script>");

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
      console.log(err);
      return;
    }
    cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
    var verificationCode = prompt('Please input verification code: ', '');
    cognitoUser.confirmRegistration(user, verificationCode);

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
    },

    onFailure: function(err) {
      console.log(err);
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
      alert(err);
      return;
    }
    console.log('call result: ' + result);
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
    },
    onFailure: function(err) {
      alert(err);
    },
    inputVerificationCode() {
      var verificationCode = prompt('Please input verification code ', '');
      var newPassword = prompt('Enter new password ', '');
      cognitoUser.confirmPassword(verificationCode, newPassword, this);
    }
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
