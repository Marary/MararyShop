function checkStatus() {
    axios({
        method: "get",
        url: "http://localhost:726/marary/checkStatusServlet",
        responseType: 'json',//解决问题的一条语句
        traditional: true,
        dataType: 'json',
        params: {
            page: this.page
        }
    }).then((response) => {
        let data = response.data
        if (data === 'yes') {
            let $loginLink = $('#login_link');
            let $registerLink = $('#register_link');
            let $iObj2 = $('#i_obj_2');
            let $iObj3 = $('#i_obj_3');
            let $homeLoginBtn = $('#home_login_btn');
            let $homeRegisterBtn = $('#home_register_btn');

            $iObj2.attr('id', 'obj_2')
            $iObj3.attr('id', 'obj_3')

            $loginLink.html('<a href="#">个人中心</a>')
            $loginLink.attr('id', 'personal_center')
            $('#personal_center').click(function () {
                window.location = "http://localhost:726/marary/personal.html"
            })
            $registerLink.html('<a href="#">退出登录</a>')
            $registerLink.attr('id', 'log_out')
            $('#log_out').click(function () {
                window.location = "http://localhost:726/marary/index.html"
                logout()
            })

            $('#obj_2').click(function () {
                window.location = "http://localhost:726/marary/orderPage.html"
            })
            $('#obj_3').click(function () {
                window.location = "http://localhost:726/marary/shoppingCart.html"
            })
            $homeLoginBtn.html('购物车')
            $homeRegisterBtn.html('订单中心')

            $homeLoginBtn.attr('id', 'home_cart_btn')
            $homeRegisterBtn.attr('id', 'home_order_btn')

            $('#home_cart_btn').click(function () {
                window.location = "http://localhost:726/marary/shoppingCart.html"
            })

            $('#home_order_btn').click(function () {
                window.location = "http://localhost:726/marary/orderPage.html"
            })

            $('#i_logo').attr('id', 'logo')
        } else if (data === 'no') {
            let $personalCenter = $('#personal_center');
            let $logOut = $('#log_out');
            let $obj2 = $('#obj_2');
            let $obj3 = $('#obj_3');
            let $homeCartBtn = $('#home_cart_btn');
            let $homeOrderBtn = $('#home_order_btn');

            $('#logo').attr('id', 'i_logo')
            $obj2.attr('id', 'i_obj_2')
            $obj3.attr('id', 'i_obj_3')
            $('#i_obj_2').click(function () {
                window.location = "http://localhost:726/marary/login.html"
            })
            $('#i_obj_3').click(function () {
                window.location = "http://localhost:726/marary/login.html"
            })

            $personalCenter.html('<a href="#">登录</a>')
            $personalCenter.attr('id', 'login_link')
            $('#login_link').click(function () {
                window.location = "http://localhost:726/marary/login.html"
            })

            $logOut.html('<a href="#">注册</a>')
            $logOut.attr('id', 'register_link')
            $('#register_link').click(function () {
                window.location = "http://localhost:726/marary/register.html"
            })

            $homeCartBtn.html('登录')
            $homeOrderBtn.html('注册')

            $homeCartBtn.attr('id', 'home_login_btn')
            $homeOrderBtn.attr('id', 'home_register_btn')

            $('#home_login_btn').click(function () {
                window.location = "http://localhost:726/marary/login.html"
            })

            $('#home_register_btn').click(function () {
                window.location = "http://localhost:726/marary/register.html"
            })
        }


    })
}

function checkStatusCart() {

}