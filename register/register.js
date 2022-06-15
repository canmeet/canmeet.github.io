
//設定點擊事件
$("#btn_login_page").on("click", loginClicked);
$("#btn_submit").on("click", register);
$("#btn_addInterest").on("click", addInterestInput);
//$(".delete_interest").on("click", deleteInterestInput);

//設定全域變數
var countInterest = 1;  // default = 1



// loginClicked: 跳往登入畫面
function loginClicked() {
  window.location.href = "https://canmeet.github.io/login/";
  window.open("https://canmeet.github.io/login/");
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

//Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()





// 取得上傳檔案的基本資訊，當選擇檔案時就會觸發頭像預覽
const fileUploader = document.querySelector("#upload_UserPhoto");
var avatarURL = "";
fileUploader.addEventListener('change', (e) => {
  console.log(e.target.files[0]); // get file object

  postData();
  // avatarURL = URL.createObjectURL(e.target.files[0]);
  // console.log(avatarURL);

  // $('#UserPhoto').attr('src', avatarURL);

});



// register: 上傳資料
function register() {

  console.log("register button got click!");
  console.log($("#emil").val());
  console.log($("#password").val());
  console.log($("#name").val());
  console.log($("#birthday").val(),);
  console.log($("#hometown").val());
  console.log(avatarURL);

  // 進行註冊
  $.ajax('https://canmeet.herokuapp.com/v1/user/register', {
        type: 'POST',  // http method
        dataType: "json",
        data: JSON.stringify({ 
          "email": $("#emil").val(),
          "password": $("#password").val(),
          "name": $("#name").val(),
          "school": $("#school").val(),
          "department": $("#department").val(),
          "grade": $("#grade").val(),
          "birthday": $("#birthday").val(),
          "hometown": $("#hometown").val(),
          "interests": "['游泳', '耍廢']",
          "photoUrl": $("#UserPhoto").attr('src')
        }),  // data to submit
        headers: {
            "Content-Type": "application/json"
        },

        success: function (data, status, xhr) {

          // 二次確認
          console.log("register successed!");
          $.confirm({
            title: '註冊成功 ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '您現在可以使用CanMeet的所有功能了!',
            buttons: {
              前往登入: function() {
                window.location.href = "https://canmeet.github.io/login/";
                window.open("https://canmeet.github.io/login/");
              }
            }
          });
        },
        error: function (e) {

            console.log(JSON.stringify(e.responseJSON));
        }
    });

    
}


//防止網頁跳轉
// $("#btn_submit").click(function(event){
//   event.preventDefault();
//   //return false;
// })


function postData() {
  var formData = new FormData();
  formData.append("file", $("#upload_UserPhoto")[0].files[0]);
  $.ajax({
      url: 'https://canmeet.herokuapp.com/v1/image/upload',
      type: "post",
      data: formData,
      processData: false, 
      contentType: false, 
      dataType: 'text',
      success: function(data) {
          var params = JSON.parse(data)
          $("#UserPhoto").attr("src", params.url);
      },
      error: function(data) {
          
      }
  });
}



// addInterestInput: 點擊後新增興趣欄位
function addInterestInput() {

  countInterest++;
  var interest_object=`<div class="input-group mb-3" id="interest${countInterest}">
  <input type="text" class="form-control form-control-sm" aria-label="Recipient's username" aria-describedby="button-addon2">
  <button class="btn btn-outline-secondary delete_interest" type="button" id="${countInterest}">x</button></div>`;
  $("div#interestGroup").append(interest_object);

  console.log(countInterest);
}

//deleteInterestInput: 點擊後刪除興趣欄位
function deleteInterestInput() {
  console.log("clicked delete!");
  console.log($(this).attr("id"));
  $(div).parent("#interst").remove();
}


$('.delete_interest').click(function (e) { 
        let getdivID = $(this).attr("id");

        console.log(getdivID);
  
 });