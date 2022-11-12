//TODO:导航头
$('#personal_center').click(function () {
    window.location = "http://localhost:0726/marary/personal.html"
})

$('#log_out').click(function () {
    window.location = "http://localhost:0726/marary/index.html"
    logout()
    sessionStorage.clear()
})

$('#i_obj_1').click(function () {
    window.location = "http://localhost:726/marary/index.html"
})

$('#i_logo').click(
    function () {
        window.location = "http://localhost:726/marary/index.html"
    }
)


var xhr;
var user;
var username;
var oldPassword;

var updatePassword = document.getElementById("updatePassword")
var updatePhone = document.getElementById("updatePhone")
var updateEmail = document.getElementById("updateEmail")

window.onload = function () {
    // var updatePWD = document.getElementById("container1")
    $('#container1').show()
    $('#container2').hide()
    $('#container3').hide()

    updatePassword.style.backgroundColor = "coral"
    updatePhone.style.backgroundColor = "#9980FA"
    updateEmail.style.backgroundColor = "#9980FA"

    getInfo();
    checkStatus()
}

function toPwd() {
    $('#container1').show()
    $('#container2').hide()
    $('#container3').hide()

    updatePassword.style.backgroundColor = "coral"
    updatePhone.style.backgroundColor = "#9980FA"
    updateEmail.style.backgroundColor = "#9980FA"
}

function toPhone() {
    $('#container2').show()
    $('#container1').hide()
    $('#container3').hide()

    updatePassword.style.backgroundColor = "#9980FA"
    updatePhone.style.backgroundColor = "coral"
    updateEmail.style.backgroundColor = "#9980FA"
}

function toEmail() {
    $('#container3').show()
    $('#container1').hide()
    $('#container2').hide()

    updatePassword.style.backgroundColor = "#9980FA"
    updatePhone.style.backgroundColor = "#9980FA"
    updateEmail.style.backgroundColor = "coral"
}

//密码1，手机2，邮箱3
//手机和邮箱需判断是否已被注册
let phoneExist = false  //true表示可用(未注册),false表示不可用(已注册)
let emailExist = false

function getInfo() {
    axios({
        method: "get",
        url: "http://localhost:726/marary/getInfoServlet",
        responseType: 'json',//解决问题的一条语句
        traditional: true,
        dataType: 'json',
        params: {
            page: this.page
        }
    }).then((response) => {
        user = response.data;
        username = user.username;
        oldPassword = user.password;
        var welcome = document.getElementById("welcome");
        welcome.innerText = "您好，" + username + "!"


    }).catch(function (error) {
        console.log(error)
    })
}


//密码区

function checkCorrect1() {
    var password = document.querySelector("input[name='oldPassword1']").value;
    if (password !== null && password !== '') {
        var msg = document.getElementById("isCorrect1")
        if (password === oldPassword) {

            msg.classList.remove('errormsg')
            msg.classList.add('okmsg');
            msg.innerText = '密码正确'
            return true;
        } else {
            msg.classList.remove('okmsg')
            msg.classList.add('errormsg');
            msg.innerText = '密码错误'
            return false;
        }
    } else {
        printError("isCorrect1", "原密码不能为空");
        return false;
    }

}

function checkPWD() {
    var pwd = document.querySelector("input[name='newPassword1']").value;
    var msg1 = document.getElementById("isAvailable1")
    if (pwd == "" || pwd == null) {
        msg1.classList.remove('okmsg')
        msg1.classList.add('errormsg');
        msg1.innerText = '新密码不能为空'
        // printError("isAvailable", "密码不能为空");
        return false;
    } else {
        var regex2 = /^[a-zA-Z\d]{8,20}$/;
        var reg1 = /\d+/
        var reg2 = /[a-zA-Z]/
        if (!(regex2.test(pwd) && reg1.test(pwd) && reg2.test(pwd))) {
            msg1.classList.remove('okmsg')
            msg1.classList.add('errormsg');
            msg1.innerText = '密码由8至20位字母与数字组合'
            // printError("isAvailable", "密码由8至20位字母与数字组合");
            return false;
        } else {
            msg1.classList.remove('errormsg')
            msg1.classList.add('okmsg');
            msg1.innerText = '密码可用'
            return true;
            // printError("isAvailable","密码可用")
        }

    }
}

function checkSame1() {
    var newPassword1 = document.querySelector("input[name='newPassword1']").value;
    var newPassword2 = document.querySelector("input[name='newPassword2']").value;

    if (newPassword2 == "" || newPassword2 == null) {
        printError("isSame1", "确认密码不能为空");
        return false;
    } else {
        if (newPassword1 === newPassword2) {
            printError("isSame1", "");
            return true;
        } else {
            printError("isSame1", "两次输入密码不一致")
            return false;
        }
    }
}

function send1() {
    if (checkCorrect1() && checkPWD() && checkSame1()) {
        let newPassword = document.querySelector("input[name='newPassword1']").value;
        let sign = "password"
        // axios.post("http://localhost:8080/marary/personServlet",JSON.stringify({'newPassword':newPassword}),
        //    redirect() );
        axios.post("http://localhost:726/marary/personServlet",
            JSON.stringify({'newPassword': newPassword, 'sign': sign}));
        redirect()
    }
}

//手机区

function checkCorrect2() {
    var password = document.querySelector("input[name='oldPassword2']").value;
    if (password !== null && password !== '') {
        var msg = document.getElementById("isCorrect2")
        if (password === oldPassword) {

            msg.classList.remove('errormsg')
            msg.classList.add('okmsg');
            msg.innerText = '密码正确'
            return true;
        } else {
            msg.classList.remove('okmsg')
            msg.classList.add('errormsg');
            msg.innerText = '密码错误'
            return false;
        }
    } else {
        printError("isCorrect2", "原密码不能为空");
        return false;
    }

}

function checkPHONE() {
    var phone = document.querySelector("input[name='newPhone1']").value;
    var msg2 = document.getElementById("isAvailable2");
    if (phone !== null && phone !== '') {
        var regex = /^[1]\d{10}$/;
        if (regex.test(phone) === false) {
            msg2.classList.remove('okmsg')
            msg2.classList.add('errormsg');
            msg2.innerText = '请输入正确的手机号'
            phoneExist = false
        } else {
            var mobile = phone;
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = p_process;
            xhr.open("GET", "phoneIsExists?mobile=" + mobile, true);
            xhr.send(null);
        }
    } else {
        msg2.classList.remove('okmsg')
        msg2.classList.add('errormsg');
        msg2.innerText = '新手机不能为空'
        phoneExist = false
    }


}

function p_process() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var responseInfo = xhr.responseText;
            var msg2 = document.getElementById("isAvailable2")
            if (responseInfo == 'Not Exist') {
                msg2.classList.remove('errormsg')
                msg2.classList.add('okmsg');
                msg2.innerText = '手机号可用'
                phoneExist = true
            } else if (responseInfo == 'Exist') {
                msg2.classList.remove('okmsg')
                msg2.classList.add('errormsg');
                msg2.innerText = '手机号已注册'
                phoneExist = false
            }
        }
    }
}

function checkSame2() {
    var newPhone1 = document.querySelector("input[name='newPhone1']").value;
    var newPhone2 = document.querySelector("input[name='newPhone2']").value;

    if (newPhone2 == "" || newPhone2 == null) {
        printError("isSame2", "确认手机不能为空");
        return false;
    } else {
        if (newPhone1 === newPhone2) {
            printError("isSame2", "");
            return true;
        } else {
            printError("isSame2", "两次输入手机不一致")
            return false;
        }
    }
}

function send2() {
    if (checkCorrect2() && phoneExist && checkSame2()) {
        let newPhone = document.querySelector("input[name='newPhone1']").value;
        let sign = "phone"
        axios.post("http://localhost:726/marary/personServlet",
            JSON.stringify({'newPhone': newPhone, 'sign': sign}));
    }
}


//邮箱区

function checkCorrect3() {
    var password = document.querySelector("input[name='oldPassword3']").value;
    if (password !== null && password !== '') {
        var msg = document.getElementById("isCorrect3")
        if (password === oldPassword) {

            msg.classList.remove('errormsg')
            msg.classList.add('okmsg');
            msg.innerText = '密码正确'
            return true;
        } else {
            msg.classList.remove('okmsg')
            msg.classList.add('errormsg');
            msg.innerText = '密码错误'
            return false;
        }
    } else {
        printError("isCorrect3", "原密码不能为空");
        return false;
    }

}

function checkEMAIL() {
    var email = document.querySelector("input[name='newEmail1']").value;
    var msg3 = document.getElementById("isAvailable3");
    if (email !== null && email !== '') {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {

            msg3.classList.remove('okmsg')
            msg3.classList.add('errormsg');
            msg3.innerText = '请输入正确的邮箱地址'
            emailExist = false
        } else {
            // var email = document.getElementById("email").value;
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = e_process;
            xhr.open("GET", "emailIsExists?email=" + email, true);
            xhr.send(null);
        }
    } else {
        msg3.classList.remove('okmsg')
        msg3.classList.add('errormsg');
        msg3.innerText = '新邮箱不能为空'
        emailExist = false
    }
}

function e_process() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var responseInfo = xhr.responseText;
            var msg3 = document.getElementById("isAvailable3")
            if (responseInfo == 'Not Exist') {
                msg3.classList.remove('errormsg')
                msg3.classList.add('okmsg');
                msg3.innerText = '邮箱可用'
                emailExist = true
            } else if (responseInfo == 'Exist') {
                msg3.classList.remove('okmsg')
                msg3.classList.add('errormsg');
                msg3.innerText = '邮箱已注册'
                emailExist = false
            }
        }
    }
}

function checkSame3() {
    var newEmail1 = document.querySelector("input[name='newEmail1']").value;
    var newEmail2 = document.querySelector("input[name='newEmail2']").value;

    if (newEmail2 == "" || newEmail2 == null) {
        printError("isSame3", "确认邮箱不能为空");
        return false;
    } else {
        if (newEmail1 === newEmail2) {
            printError("isSame3", "");
            return true;
        } else {
            printError("isSame3", "两次输入邮箱不一致")
            return false;
        }
    }
}

function send3() {
    if (checkCorrect3() && emailExist && checkSame3()) {
        let newEmail = document.querySelector("input[name='newEmail1']").value;
        let sign = "email"
        axios.post("http://localhost:726/marary/personServlet",
            JSON.stringify({'newEmail': newEmail, 'sign': sign}));

    }
}


function redirect() {
    logout();
    window.location = "http://localhost:726/marary/index.html"
}


// 清空 input 标签后的提示信息
// var tags = document.getElementsByTagName('input');
// for (var i = 0; i < tags.length; i++) {
//     tags[i].onchange = function(){
//         var idname = this.name + "Err";
//         document.getElementById(idname).innerHTML = '';
//     }
// }

document.getElementById("isCorrect1").innerHTML = '';
document.getElementById("isAvailable1").innerHTML = '';
document.getElementById("isSame1").innerHTML = '';

document.getElementById("isCorrect2").innerHTML = '';
document.getElementById("isAvailable2").innerHTML = '';
document.getElementById("isSame2").innerHTML = '';

document.getElementById("isCorrect3").innerHTML = '';
document.getElementById("isAvailable3").innerHTML = '';
document.getElementById("isSame3").innerHTML = '';

// 显示错误消息
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function logout() {
    //登出时清空登录域对象
    axios({
        method: "get",
        url: "http://localhost:726/marary/logoutServlet",
        responseType: 'json',//解决问题的一条语句
        traditional: true,
        dataType: 'json',
        params: {
            page: this.page
        }
    })
}
