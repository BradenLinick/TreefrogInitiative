var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){

var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

const url = {
  base: 'http://sfi.gotdns.com:8080/CFRApi/handler/testToken',
  header: {
    Authorization: password
  }
}

if ( username == "Admin" && password == "admin#123"){
alert ("Login successfully");
window.location = "http://127.0.0.1:5500/templates/GenerationToken.html"; // Redirecting to other page.
// window.location = "http://localhost/frogs/templates/GenerationToken.html"; // Redirecting to other page.
return false;
} 

else if (username !== "Admin") {
  let jsondata = '';
  fetch('http://sfi.gotdns.com:8080/CFRApi/handler/testToken')
  .then(response => {
    console.log(response)
    response.json()
    if (response === 'Token pass.') {
      window.location = "http://127.0.0.1:5500/index.html"
    }
  })
  .then(newData => {
    console.log(newData)
    jsondata = newData;
  })
  .catch(err => console.log(error));
}

else{
attempt --;// Decrementing by one.
alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}

