window.onload = function () {
    checkStatus()
}

//列表

function change(myid, mode) {
    document.getElementById(myid).style.display = mode;
    if (mode == 'block') {//显示下拉菜单
        //设置下拉菜单所在的div边框
        document.getElementById(myid).style.border = "1px solid #eee";
        document.getElementById(myid).style.borderTop = "none";
        //设置鼠标划过的li的边框以及背景颜色
        document.getElementById(myid).parentNode.style.border = "1px solid #eee";
        document.getElementById(myid).parentNode.style.borderBottom = "none";
    } else {
        //当不显示下拉列表的时候 鼠标划过的li的边框以及背景颜色
        document.getElementById(myid).parentNode.style.backgroundColor = "";
        document.getElementById(myid).parentNode.style.border = "";
    }
}

//TODO:导航头
$('#login_link').click(function () {
    window.location = "http://localhost:726/marary/login.html"
})

$('#register_link').click(function () {
    window.location = "http://localhost:726/marary/register.html"
})

$('#i_logo').click(function () {
    window.location = "http://localhost:726/marary/index.html"
})

$('#i_obj_1').click(function () {
    window.location = "http://localhost:726/marary/index.html"
})
$('#i_obj_2').click(function () {
    window.location = "http://localhost:726/marary/login.html"
})

$('#i_obj_3').click(function () {
    window.location = "http://localhost:726/marary/mcx"
})

$('#home_login_btn').click(function () {
    window.location = "http://localhost:726/marary/login.html"
})

$('#home_register_btn').click(function () {
    window.location = "http://localhost:726/marary/register.html"
})