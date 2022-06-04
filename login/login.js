function fnSend(){
    let requestBody = { "email": $("#email").val(), "password": $("#password").val() };
    $.ajax('https://app.swaggerhub.com/apis-docs/CanMeet/CanMeet-API/1.0.0#', {
        type: 'POST',  // http method
        dataType: "json",
        data: JSON.stringify({ email: $("#email").val(), "password": $("#password").val() }),  // data to submit
        headers: {
            "Content-Type": "application/json"
        },

        success: function (data, status, xhr) {
            $('#myid').html('登入成功 Status Code: ' + xhr.status + ', data: ' + JSON.stringify(data));
        },
        error: function (e) {
            $('#myid').html('登入失敗, Status Code: '+e.status+ ', data: ' + JSON.stringify(e.responseJSON));
        }
    });
}