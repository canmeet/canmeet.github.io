function validate(){
    var email = document.getElementById("email").value;
    var password = documet.getElementById("password").value;
    if (email == "a123@abcbc.com" && password =="123456"){
        alert("Login successfully");
    }
    else{
        alert("Login failed");
    }
    return false
}