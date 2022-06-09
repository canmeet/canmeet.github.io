document.getElementById("btn_login_page").addEventListener("click", fnSend);

function fnSend(){
    let requestBody = { "email": $("#email").val(), "password": $("#password").val() };
    $.ajax('https://canmeet.herokuapp.com/v1/user/login', {
        type: 'POST',  // http method
        dataType: "json",
        data: JSON.stringify({ email: $("#email").val(), "password": $("#password").val() }),  // data to submit
        headers: {
            "Content-Type": "application/json"
        },

        success: function (data, status, xhr) {
            document.cookie = `Authorization=Bearer ${data.token}`;
            $('#myid').html('<p style="font-size=15px; color:red;">登入成功 Status Code: ' + xhr.status + ', data: ' + JSON.stringify(data)+'</p>');
        },
        error: function (e) {
            $('#myid').html('<p style="font-size=15px; color:red;">登入失敗, Status Code: '+e.status+ ', data: ' + JSON.stringify(e.responseJSON)+'</p>');
        }
    });
}
