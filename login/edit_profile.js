window.onload = setData;

//設定點擊事件
$("#btn_login_page").on("click", loginClicked);

// loginClicked: 跳往登入畫面
function loginClicked() {

  console.log("login got click!");
  window.location.href = "https://canmeet.github.io/login/";
  window.open("https://canmeet.github.io/login/");
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
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

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setData() {

  let test_token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzekBhYmMuY29tIiwiZW1haWwiOiJzekBhYmMuY29tIiwiaWF0IjoxNjU1MzEwMjc4fQ.l8indQpXTCeSSpT4YyVtuymUpmSjcNdouR_GBLPXFbM";


  console.log("page onload!");
  console.log("token" + getCookie("Authorization"));


  $.ajax('https://canmeet.herokuapp.com/v1/user/info/details', {
            type: 'GET',  // http method
            // dataType: "json",
            // data: JSON.stringify({  }),
            headers: {
                "Content-Type": "application/json",
                //"Authorization": res.value
                "Authorization": test_token
            },

            success: function (data, status, xhr) {
                console.log("successfully get user info!");  



                $('#myPhoto').attr('src', data.photoUrl);
            },
            error: function (e) {
                // $('#myid').html('登入失敗, Status Code: ' + e.status + ', data: ' + JSON.stringify(e.responseJSON));
                console.log(JSON.stringify(e))
            }
        });
}

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
