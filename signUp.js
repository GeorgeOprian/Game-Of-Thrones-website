window.onload = function () {
    var form = document.getElementsByTagName("form")[0];
    form.onsubmit = function (submit) {
        submit.preventDefault();
        registerUser()
    }
}

function registerUser() {
    if (passwordsMatch()) {


        var xmlRequest = new XMLHttpRequest();

        if (!xmlRequest) {
            alert("Cannot create XmlHttpRequest ");
            return false;
        }
        
        xmlRequest.open('POST', 'http://localhost:8080/sign_up', true);

        var newUser = createUser();
        var stringOb = JSON.stringify(newUser);

        xmlRequest.send(stringOb);


        xmlRequest.onreadystatechange = function () {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    alert(xmlRequest.responseText);
                } else {
                    alert("xmlRequest.status = " + xmlRequest.status);
                }
            } 
        }
        
    }

}

function passwordsMatch() {
    if (document.getElementById('password').value !=
        document.getElementById('ConfirmPassword').value) {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'password does not match';
        return false;
    }
    return true;
}


function createUser() {
    
    var username = document.getElementsByName("username")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    
    var newUser = { 'username': username, 'email': email, 'password': password }

    return newUser;
}
