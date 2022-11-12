let isRight = false

$('#login_btn').click(function () {
    //登录
    const config = {
        headers: {
            contentType: 'application/json;charset=utf-8',
            responseType: 'json',
            traditional: true,
            dataType: 'json',
        }
    }
    const url = "http://localhost:726/marary/login"

    let username = $('#username').val()
    let password = $('#password').val()

    let keyword = {
        username: username,
        password: password
    }

    checkValidateCode()//检验验证码

    if (isRight) {
        axios.post(url, JSON.stringify(keyword), config).then(
            res => {

                let result = res.data
                if (result === 'success') {
                    window.location = "http://localhost:726/marary/home.html"
                } else {
                    //登录失败，账号或密码错误
                    window.location = "http://localhost:726/marary/login.html"
                }

            }
        )
    }


})

function checkValidateCode() {
    var validateCode = document.querySelector("input[name='verification_code']").value;
    var msg3 = document.getElementById("validateErr")
    if (validateCode !== null && validateCode !== '') {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = v_process;
        xhr.open("GET", "CheckValidateCodeServlet?validateCode=" + validateCode, true);
        xhr.send(null);
    } else {
        msg3.classList.remove('okmsg')
        msg3.classList.add('errormsg');
        msg3.innerText = '请输入验证码'
        isRight = false
    }
}

function v_process() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var responseInfo = xhr.responseText;
            var msg3 = document.getElementById("validateErr")
            if (responseInfo == 'Correct') {
                msg3.classList.remove('errormsg')
                msg3.classList.add('okmsg');
                msg3.innerText = '验证码正确'
                isRight = true
            } else if (responseInfo == 'Wrong') {
                msg3.classList.remove('okmsg')
                msg3.classList.add('errormsg');
                msg3.innerText = '请输入正确的验证码'
                changeValidateCode()
                isRight = false
            }
        }
    }
}


//刷新验证码
function changeValidateCode() {
    var img = document.getElementById("validate-code");
    img.src = "ValidateCodeServlet?t=" + Math.random();
}

