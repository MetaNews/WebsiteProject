document.writeln("<script type='text/javascript' src='./static/js/dependencies/aws-sdk-2.49.0.min.js'></script>");
AWS.config.region = 'us-east-1';

// Configure the credentials provider to use your identity pool
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:13f307ef-2fe9-47b0-934c-e47228d4e8c6',
});

// Make the call to obtain credentials
AWS.config.credentials.get(function() {

  // Credentials will be available when this function is called.
  var accessKeyId = AWS.config.credentials.accessKeyId;
  var secretAccessKey = AWS.config.credentials.secretAccessKey;
  var sessionToken = AWS.config.credentials.sessionToken;

});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function listTables() {
  var params = {};
  dynamodb.listTables(params, function(err, data) {
    if (err) {
      document.getElementById('textarea').innerHTML = "Unable to list tables: " + "\n" + JSON.stringify(err, undefined, 2);
    } else {
      document.getElementById('textarea').innerHTML = "List of tables: " + "\n" + JSON.stringify(data, undefined, 2);
    }
  });
}


function queryData() {

  var params = {
    TableName: "articles",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "ID"
    },
    ExpressionAttributeValues: {
      ":id": 1
    }
  };

  docClient.query(params, function(err, data) {
    if (err) {
      document.getElementById('textarea').innerHTML += "Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2);
    } else {
      data.Items.forEach(function(article) {
        document.getElementById('textarea').innerHTML += "\n" + article.WebsiteURL + ": " + article.Website;
      });

    }
  });
}

function scanData() {

  var params = {
    TableName: "articles",
    ProjectionExpression: "WebsiteURL,Website,Reporter,UpVotes,LeftVotes",
    FilterExpression: "#id between :startID and :endID",
    ExpressionAttributeNames: {
      "#id": "id"
    },
    ExpressionAttributeValues: {
      ":startID": 0,
      ":endID": 5
    }
  };

  docClient.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
    } else {
      // Print all the movies
      document.getElementById('textarea').innerHTML += "Scan succeeded: " + "\n";
      data.Items.forEach(function(article) {
        document.getElementById('textarea').innerHTML += article.WebsiteURL + ": " + article.Website + " - Reporter: " + article.Reporter + " UpVotes: " + article.UpVotes + " LeftVotes: " + article.LeftVotes + " \n";
      });

      // Continue scanning if we have more movies (per scan 1MB limitation)
      //document.getElementById('textarea').innerHTML += "Scanning for more..." + "\n";
      //params.ExclusiveStartKey = data.LastEvaluatedKey;
      //docClient.scan(params, onScan);
    }
  }
}
