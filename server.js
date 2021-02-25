var http = require('http');
var url = require ('url');
var fs = require('fs');

var server = http.createServer(
    function(req, res){
        
        var body = "";
        var url_parsed = url.parse(req.url, true);

        if (url_parsed.pathname == "/sign_up") {

            req.on ('data', function(data){
                body += data;
            })

            req.on ('end', function (){
                console.log("I received a query");
                var receivedUser = JSON.parse(body);
                
                console.log("Received User: ");
                console.log(receivedUser);

                if (tryToInsertNewUser(receivedUser) == false) {
                    response = "User already registered";
                } else {
                    response = "User registered successfully";
                }


                res.statusCode = 200;
                res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin': null});
                res.end(response);

                
            })
        }

        if (url_parsed.pathname == "/log_in") {
            
            var query = url_parsed.query;
            var waitingUserToLogIn = {'username' : query.username, 'password': query.password};
            

            var listOfUsers = [];
            if (fs.existsSync("users.json")) {
                var usersJson = fs.readFileSync("users.json");
                listOfUsers = JSON.parse(usersJson);
            }

            var resStatus;
            resStatus = 404;
                resString = "Problems when logging in";
            if (listOfUsers != []) {
                console.log(waitingUserToLogIn);
                console.log(listOfUsers);
                for (user of listOfUsers){
                    if (userAndPasswordMatch(user, waitingUserToLogIn)){
                        resStatus = 200;
                        resString = "User logged in successfully";
                    }
                }
            }
            res.statusCode = resStatus;
            res.setHeader('Content-Type', 'text/html');
            var response = "<h3>Response: </h3>\n" + resString;
            res.write(response);
            console.log("response sent is: " + response);
            res.end();
            
        }
    }
    ) 


server.listen(8080);
console.log("Listening on port 8080")

function tryToInsertNewUser (receivedUser) {
    var listOfUsers = [];
    console.log("try to register");
    var fileEmpty = false;
    if (fs.existsSync("users.json")){
        var inputList = fs.readFileSync("users.json");
        if (inputList.length != 0)
            listOfUsers = JSON.parse(inputList);
        else 
            fileEmpty = true;
    }
    
    if (!isUserInDataBase (receivedUser, listOfUsers) || fileEmpty)
        listOfUsers.push(receivedUser);
    else {
        console.log("Register failed user already in data base");
        console.log(receivedUser);

        return false;
    }

    console.log(listOfUsers);

    fs.writeFileSync("users.json", JSON.stringify(listOfUsers))

    return true;
}

function isUserInDataBase (receivedUser, listOfUsers) {
    for (user of listOfUsers){
        if (compareUsersOnInsert(user, receivedUser) == true){
            return true;
        }
    }

    return false;
}

function userAndPasswordMatch(currentUser, requestedUser){
    if (currentUser.username == requestedUser.username && currentUser.password == requestedUser.password)
        return true;
    return false 
}

function compareUsersOnInsert (user1, user2) {
    if (user1.username == user2.username || user1.email == user2.email) {
        return true;
    }
    return false;
}