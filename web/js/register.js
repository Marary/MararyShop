var xhr;
let NameStatus = false
let PhoneStatus = false
let EmailStatus = false
let CodeStatus = false

function checkUsername() {
    var username = document.getElementById('username').value;
    if (username !== null && username !== '') {
        var regex = /^[a-zA-Z]\w{5,17}$/;
        var reg = /\d+/
        if (regex.test(username) && reg.test(username)) {
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = process;
            xhr.open("GET", "usernameIsExists?username=" + username, true);
            xhr.send(null);
        } else {
            printError("nameErr", "以字母开头的6至18位字母与数字组合");
            NameStatus = false
        }

    }
}

$('#register_btn').click(function () {
    //登录
    const config = {
        headers: {
            contentType: 'application/json;charset=utf-8',
            responseType: 'json',
            traditional: true,
            dataType: 'json',
        }
    }
    const url = "http://localhost:726/marary/register"

    let username = $('#username').val()
    let password = $('#password').val()
    let email = $('#email').val()
    let phoneNum = $('#mobile').val()

    let keyword = {
        username: username,
        password: password,
        email: email,
        phoneNum: phoneNum
    }

    console.log(NameStatus + " ," + checkPWD() + "," + PhoneStatus + " ," + EmailStatus + " ," + CodeStatus)
    if (NameStatus && checkPWD() && EmailStatus && PhoneStatus && CodeStatus) {
        axios.post(url, JSON.stringify(keyword), config).then(
            res => {
                let result = res.data
                if (result === 'success') {
                    window.location = "http://localhost:726/marary/login.html"
                } else {
                    //注册失败
                    window.location = "http://localhost:726/marary/register.html"
                }
            }
        )
    }


})

function process() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var responseInfo = xhr.responseText;
            var msg = document.getElementById("nameErr")
            if (responseInfo == 'Not Exist') {
                msg.classList.remove('errormsg')
                msg.classList.add('okmsg');
                msg.innerText = '用户名可用'
                NameStatus = true
            } else if (responseInfo == 'Exist') {
                msg.classList.remove('okmsg')
                msg.classList.add('errormsg');
                msg.innerText = '用户名不可用'
                NameStatus = false
            }
        }
    }
}

function checkPWD() {
    var pwd = $('#password').val();
    if (pwd == "" || pwd == null) {
        printError("pwdErr", "密码不能为空");
        return false;
    } else {
        var regex2 = /^[a-zA-Z\d]{8,20}$/;
        var reg1 = /\d+/
        var reg2 = /[a-zA-Z]/
        if (!(regex2.test(pwd) && reg1.test(pwd) && reg2.test(pwd))) {
            printError("pwdErr", "密码由8至20位字母与数字组合");
            return false;
        } else {
            printError("pwdErr", "")
            return true
        }

    }
}

function checkEmail() {
    var email = document.querySelector("input[name='email']").value;
    if (email !== null && email !== '') {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            var msg1 = document.getElementById("emailErr");
            msg1.classList.remove('okmsg')
            msg1.classList.add('errormsg');
            printError("emailErr", "请输入正确的邮箱地址");
            EmailStatus = false
        } else {
            var email = document.getElementById("email").value;
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = e_process;
            xhr.open("GET", "emailIsExists?email=" + email, true);
            xhr.send(null);
        }
    }


}

function e_process() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var responseInfo = xhr.responseText;
            var msg1 = document.getElementById("emailErr")
            if (responseInfo == 'Not Exist') {
                msg1.classList.remove('errormsg')
                msg1.classList.add('okmsg');
                msg1.innerText = '邮箱可用'
                EmailStatus = true
            } else if (responseInfo == 'Exist') {
                msg1.classList.remove('okmsg')
                msg1.classList.add('errormsg');
                msg1.innerText = '邮箱已注册'
                EmailStatus = false
            }
        }
    }
}

function checkPhone() {
    var mobile = document.querySelector("input[name='mobile']").value;
    if (mobile !== null && mobile !== '') {
        var regex = /^[1]\d{10}$/;
        if (regex.test(mobile) === false) {
            var msg2 = document.getElementById("mobileErr");
            msg2.classList.remove('okmsg')
            msg2.classList.add('errormsg');
            printError("mobileErr", "您输入的手机号码有误");
            PhoneStatus = false
        } else {
            var mobile = document.getElementById("mobile").value;
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = p_process;
            xhr.open("GET", "phoneIsExists?mobile=" + mobile, true);
            xhr.send(null);

        }
    }


}

function p_process() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var responseInfo = xhr.responseText;
            var msg2 = document.getElementById("mobileErr")
            if (responseInfo == 'Not Exist') {
                msg2.classList.remove('errormsg')
                msg2.classList.add('okmsg');
                msg2.innerText = '手机号可用'
                PhoneStatus = true
            } else if (responseInfo == 'Exist') {
                msg2.classList.remove('okmsg')
                msg2.classList.add('errormsg');
                msg2.innerText = '手机号已注册'
                PhoneStatus = false
            }
        }
    }
}

function checkValidateCode() {
    var validateCode = document.querySelector("input[name='verification_code']").value;
    if (validateCode !== null && validateCode !== '') {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = v_process;
        xhr.open("GET", "CheckValidateCodeServlet?validateCode=" + validateCode, true);
        xhr.send(null);
    } else {
        CodeStatus = false
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
                CodeStatus = true
            } else if (responseInfo == 'Wrong') {
                msg3.classList.remove('okmsg')
                msg3.classList.add('errormsg');
                msg3.innerText = '请输入正确的验证码'
                changeValidateCode()
                CodeStatus = false
            }
        }
    }
}


//刷新验证码
function changeValidateCode() {
    var img = document.getElementById("validate-code");
    img.src = "ValidateCodeServlet?t=" + Math.random();
}


// 清空 input 标签后的提示信息
var tags = document.getElementsByTagName('input');
for (var i = 0; i < tags.length; i++) {
    tags[i].onchange = function () {
        var idname = this.name + "Err";
        document.getElementById(idname).innerHTML = '';
    }
}

// 显示错误消息
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

// 验证表单数据
function validateForm() {
    // 获取表单元素的值
    var name = document.querySelector("input[name='name']").value;
    var pwd = document.querySelector("input[name='pwd']").value;
    var email = document.querySelector("input[name='email']").value;
    var mobile = document.querySelector("input[name='mobile']").value;
    var validateCode = document.querySelector("input[name='verification_code']").value;

    if (name == "" || name == null) {
        printError("nameErr", "用户名不能为空");
        return false;
    } else {
        var regex1 = /^[a-zA-Z]\w{5,17}$/;
        var reg = /\d+/
        if (!(regex1.test(name) && reg.test(name))) {
            printError("nameErr", "用户名由6至18位字母与数字组合，且以字母开头");
            return false;
        }
        if (pwd == "" || pwd == null) {
            printError("pwdErr", "密码不能为空");
            return false;
        } else {
            var regex2 = /^[a-zA-Z\d]{8,20}$/;
            var reg1 = /\d+/
            var reg2 = /[a-zA-Z]/
            if (!(regex2.test(pwd) && reg1.test(pwd) && reg2.test(pwd))) {
                printError("pwdErr", "密码由8至20位字母与数字组合");
                return false;
            } else
                printError("pwdErr", "")
        }
        if (email == "" || email == null) {
            printError("emailErr", "邮箱不能为空");
            return false;
        } else {
            var regex = /^\S+@\S+\.\S+$/;
            if (regex.test(email) === false) {
                printError("emailErr", "请输入正确的邮箱地址");
                return false;
            }
        }
        if (mobile == "" || mobile == null) {
            printError("mobileErr", "手机号不能为空");
            return false;
        } else {
            var regex = /^[1]\d{10}$/;
            if (regex.test(mobile) === false) {
                printError("mobileErr", "您输入的手机号码有误");
                return false;
            }
        }
        if (validateCode == "" || validateCode == null) {
            printError("validateErr", "请输入验证码");
            return false;
        } else {

        }
    }


}

