
window.onload = function () {
    checkStatus()
}

//列表

function change(myid,mode) {
    document.getElementById(myid).style.display=mode;
    if(mode=='block'){//显示下拉菜单
        //设置下拉菜单所在的div边框
        document.getElementById(myid).style.border="1px solid #eee";
        document.getElementById(myid).style.borderTop="none";
        //设置鼠标划过的li的边框以及背景颜色
        document.getElementById(myid).parentNode.style.border="1px solid #eee";
        document.getElementById(myid).parentNode.style.borderBottom="none";
    }
    else{
        //当不显示下拉列表的时候 鼠标划过的li的边框以及背景颜色
        document.getElementById(myid).parentNode.style.backgroundColor="";
        document.getElementById(myid).parentNode.style.border = "";
    }
}


//TODO:导航头
$('#personal_center').click(function () {
    window.location = "http://localhost:726/marary/personal.html"
})

$('#logo').click(function () {
    window.location = "http://localhost:726/marary/home.html"
})
$('#obj_1').click(function () {
    window.location = "http://localhost:726/marary/home.html"
})

$('#obj_2').click(function () {
    window.location = "http://localhost:726/marary/orderPage.html"
})

$('#obj_3').click(function () {
    window.location = "http://localhost:726/marary/shoppingCart.html"
})

$('#home_cart_btn').click(function () {
    window.location = "http://localhost:726/marary/shoppingCart.html"
})

$('#home_order_btn').click(function () {
    window.location = "http://localhost:726/marary/orderPage.html"
})

$('#log_out').click(function () {
    window.location = "http://localhost:726/marary/index.html"
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
    })

    //TODO:搜索
    $('#animalTable').hide()
    const config1 = {
        headers: {
            contentType: 'application/json;charset=utf-8',
            responseType: 'json',
            traditional: true,
            dataType: 'json',
        }
    }
const url1 = "http://localhost:726/marary/searchServlet"

    //关键字事件
    $('#keyword').bind("input moneychangers",function () {
    let keyword = $('#keyword').val();
    if (keyword == null || keyword == ""){
    $('#show').hide()
    return ;
}

        axios.post(url1, JSON.stringify(keyword), config1).then(resp => {
            let datas = resp.data

            let results = ""
            if (datas !== 'failure') {
                if (datas.length <= 10) {
                    for (let i = 0; i < datas.length; i++) {
                        results += "<span class='optional' >" + datas[i].specific + "</span>"
                    }
                } else {
                    for (let i = 0; i < 10; i++) {
        results += "<span class='optional'>" + datas[i].specific + "</span>"
}
}
    $('#show').html(results)
    $('#show').show()
    if (datas.length===0){
    $('#show').hide()
}
}else {
    $('#show').hide()
}

    $('#show').children().click(function () {
    let keyword = $(this).html()
    $('#keyword').val(keyword)
    $('#show').hide()
})
})
})

    //TODO:光标移出时事件-未实现
    $('#main').click(function () {
    $('#show').hide()
})

$('#search').click(function () {

    let keyword = $('#keyword').val();

    mainPageSelectGoods(keyword)

})


function mainPageSelectGoods(keyword) {

    if (keyword !== '' && keyword !== null) {
        if (localStorage.length !== 0)
            localStorage.clear()
        const config = {
            headers: {
                contentType: 'application/json;charset=utf-8',
                responseType: 'json',
                traditional: true,
                dataType: 'json',
            }
        }
        const url = "http://localhost:726/marary/searchGoodsServlet"

        axios.post(url, JSON.stringify(keyword), config).then(res => {
            let result = res.data
            let datas = []
            for (let i = 0; i < result.length; i++) {
                let data = {
                    id: result[i].id,
                    name: result[i].name,
                    number: result[i].number,
                    price: result[i].price,
                    type: result[i].type,
                    specific: result[i].specific,
                    url: result[i].url
                }
                datas.push(data)
            }
            localStorage.setItem('goods', JSON.stringify(datas))
            this.location.href = 'http://localhost:726/marary/searchPage.html'
        })
    } else {
        localStorage.setItem('goods', JSON.stringify('all'))
        this.location.href = 'http://localhost:726/marary/searchPage.html'
    }


}

function mainShowItem(keyword) {

    if (keyword !== '') {
        if (localStorage.length !== 0)
            localStorage.clear()
        const config = {
            headers: {
                contentType: 'application/json;charset=utf-8',
                responseType: 'json',
                traditional: true,
                dataType: 'json',
            }
        }
        const url = "http://localhost:726/marary/searchGoodsServlet"

        axios.post(url, JSON.stringify(keyword), config).then(res => {
            let datas = res.data
            localStorage.setItem("goods", JSON.stringify(''))
            localStorage.setItem('item', JSON.stringify(datas))
            this.location.href = 'http://localhost:726/marary/searchPage.html'
        })
    } else {
        localStorage.setItem('goods', JSON.stringify('all'))
        this.location.href = 'http://localhost:726/marary/searchPage.html'
    }

}

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
            $('#logo').click(function () {
                window.location = "http://localhost:726/marary/home.html"
            })
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


