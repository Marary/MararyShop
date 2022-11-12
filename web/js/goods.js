//先隐藏具体商品详情展示页面
hideLayout2()

//转到商品页面
function showItem(keyword) {
    hideLayout1()
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
        let Data1 = ''
        let Data2 = ''


        let length = datas.length

        if (length === 0)
            Data1 += "<div class='load_error'>加载出错啦</div>"
        else {

            Data1 += "<div><img class='goods' src='" + datas[0].url + "')'></div>"
            Data2 += "<div>" +
                "<div id='item_id_info' class='item_info' style='display: none'>商品编号：<input type='text' id='item_info' disabled='disabled'" +
                "value='" + datas[0].id + "' class='item_number'>" + "</div>" +
                "<div id='item_top' class='item_info'>商品名称：" + datas[0].name + "</div>" +
                "<div class='item_info'>商品价格：" + datas[0].price + "</div>" +
                "<div class='item_info' id='pro_number'>商品数量：" + "<button onclick=\"checkTest3(this,1)\">-</button>\n" +
                "<input type=\"text\" class='product_number' name=\"\"  value=\"" + 1 + "\" />\n" +
                "<button class=\"bot\" onclick=\"checkTest3(this,2)\">+</button>\n" + "</div>" +
                "<div class=\"addCart_btn\"><img src=\"img/addCart.png\" onclick=\"addCart(this)\" alt=''></div>" +
                "</div>"

            var information = "浏览了" + datas[0].name + " 商品编号为:" + datas[0].id + " 价格为:" + datas[0].price
            //记录日志
            axios.post("http://localhost:726/marary/addLogServlet", JSON.stringify({'information': information}));

        }


        document.getElementById("commodity_3").innerHTML = Data1;
        document.getElementById("commodity_4").innerHTML = Data2;

        showRecommend(keyword)
    })


}

function addCart(Window) {
    //添加进购物车
    const config = {
        headers: {
            contentType: 'application/json;charset=utf-8',
            responseType: 'json',
            traditional: true,
            dataType: 'json',
        }
    }
    const url = "http://localhost:726/marary/addNewCartServlet"

    let item_id = $(Window).parent().siblings('#item_id_info').children('.item_number').val()
    let number = $(Window).parent().siblings('#pro_number').children('.product_number').val()


    let keyword = {
        item_id: item_id,
        item_number: number
    }

    //记录日志
    var information = "将编号为" + item_id + "的商品添加进购物车"
    console.log(information)

    axios.post(url, JSON.stringify(keyword), config)
    axios.post("http://localhost:726/marary/addLogServlet", JSON.stringify({'information': information}));

    axios.post(url, JSON.stringify(keyword), config).then(res => {
        let data = res.data
        doEdit(data)
    })
}

function doEdit(data) {
    let $myModal = $('#myModal');

    if (data === 'success') {
        $myModal.children('#modal_item').text("添加购物车成功")
    } else if (data === 'failure') {
        $myModal.children('#modal_item').text("购物车中已存在")
    } else {
        $myModal.children('#modal_item').text("添加购物车失败")
    }

    $myModal.attr('style', 'display:block')
    setTimeout(function () {
        $myModal.attr('style', 'display:none')
    }, 1000)

}

function checkTest3(item, number) {
    let now = $(item).siblings(".product_number").val()
    if (number === 1) {
        if (now > 1) {
            let number = now - 1
            $(item).siblings(".product_number").val(number)
        }

    } else if (number === 2)
        if (now <= 9) {
            let number = now - (-1)
            $(item).siblings(".product_number").val(number)
        }


}

//查询某类商品
function selectGoods(keyword) {
    hideLayout2()
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
        let Data1 = ''
        let Data2 = ''

        let length = datas.length

        for (let i = 0; i < length; i++) {
            if (i % 2 === 0)
                Data1 += "<div><img class='goods' src='" + datas[i].url + "' onclick='showItem(\"" + datas[i].name + "\")'>" +
                    "<span class='goods_text'>￥" + datas[i].price + "</span></div>"
            if (i % 2 === 1)
                Data2 += "<div><img class='goods' src='" + datas[i].url + "' onclick='showItem(\"" + datas[i].name + "\")'>" +
                    "<span class='goods_text'>￥" + datas[i].price + "</span></div>"
        }

        document.getElementById("commodity_1").innerHTML = Data1;
        document.getElementById("commodity_2").innerHTML = Data2;

        if (Data1 === '' && Data2 === '') {
            Data1 += '<div class="load_error">暂无搜索内容</div>'
            document.getElementById("commodity_1").innerHTML = Data1;
        }

    })
}


function showGoods(keyword) {
    let datas = keyword
    let Data1 = ''
    let Data2 = ''

    hideLayout2()

    if (datas !== null) {
        let length = datas.length

        for (let i = 0; i < length; i++) {
            if (i % 2 === 0) {
                Data1 += "<div><img class='goods' src='" + datas[i].url + "' onclick='showItem(\"" + datas[i].name + "\")'>" +
                    "<span class='goods_text'>￥" + datas[i].price + "</span></div>"
            }

            if (i % 2 === 1)
                Data2 += "<div><img class='goods' src='" + datas[i].url + "' onclick='showItem(\"" + datas[i].name + "\")'>" +
                    "<span class='goods_text'>￥" + datas[i].price + "</span></div>"
        }

        document.getElementById("commodity_1").innerHTML = Data1;
        document.getElementById("commodity_2").innerHTML = Data2;

        if (Data1 === '' && Data2 === '') {
            Data1 += '<div class="load_error">暂无搜索内容</div>'
            document.getElementById("commodity_1").innerHTML = Data1;
        }
    } else {
        if (Data1 === '' && Data2 === '') {
            Data1 += '<div class="load_error">暂无搜索内容</div>'
            document.getElementById("commodity_1").innerHTML = Data1;
        }

    }
}

function showItemFromMain(keyword) {
    let datas = keyword
    let Data1 = ''
    let Data2 = ''

    hideLayout1()
    if (datas !== null) {
        let length = datas.length

        if (length === 0)
            Data1 += "<div class='load_error'>加载出错啦</div>"
        else {

            Data1 += "<div><img class='goods_item' src='" + datas[0].url + "'></div>"
            Data2 += "<div>" +
                "<div id='item_id_info' class='item_info' style='display:none;'>商品编号：<input type='text' id='item_info' disabled='disabled'" +
                "value='" + datas[0].id + "' class='item_number'>" + "</div>" +
                "<div id='item_top' class='item_info'>商品名称：" + datas[0].name + "</div>" +
                "<div class='item_info'>商品价格：" + datas[0].price + "</div>" +
                "<div class='item_info' id='pro_number'>商品数量：" + "<button onclick=\"checkTest3(this,1)\">-</button>\n" +
                "<input type=\"text\" class='product_number' name=\"\"  value=\"" + 1 + "\" />\n" +
                "<button class=\"bot\" onclick=\"checkTest3(this,2)\">+</button>\n" + "</div>" +
                "<div class=\"addCart_btn\"><img src=\"img/addCart.png\" onclick=\"addCart(this)\" alt=''></div>" +
                "</div>"


            var information = "浏览了" + datas[0].name + " 商品编号为:" + datas[0].id + " 价格为:" + datas[0].price
            //记录日志
            axios.post("http://localhost:726/marary/addLogServlet", JSON.stringify({'information': information}));
        }

        document.getElementById("commodity_3").innerHTML = Data1;
        document.getElementById("commodity_4").innerHTML = Data2;
        showRecommend(datas[0].name)
    } else {
        Data1 += "<div class='load_error'>加载出错啦</div>"
        document.getElementById("commodity_3").innerHTML = Data1;
    }


}


//展示推荐
function showRecommend(keyword) {
    let str_1 = keyword.substring(0, keyword.length - 1)
    let number = keyword.substring(keyword.length - 1, keyword.length)

    let Data1 = ''
    let Data2 = ''

    for (let i = 1; i < 6; i++) {
        if (number !== i.toString()) {
            let str = str_1 + i
            const config = {
                headers: {
                    contentType: 'application/json;charset=utf-8',
                    responseType: 'json',
                    traditional: true,
                    dataType: 'json',
                }
            }
            const url = "http://localhost:726/marary/searchGoodsServlet"


            axios.post(url, JSON.stringify(str), config).then(res => {
                let datas = res.data
                let length = datas.length

                if (length === 0)
                    Data1 = "<div class='load_error'>加载出错啦</div>"
                else {

                    Data1 = "<h3 id=\"recommend_label\">为你推荐</h3>'"

                    Data2 += "<div class=\"recommend_item\"><img class=\"recommend_img\" src='" + datas[0].url + "' onclick='showItem(\"" + str + "\")'></div>"
                    document.getElementById("recommend").innerHTML = Data1;
                    document.getElementById("recommend_info").innerHTML = Data2;

                }
            })
        }
    }


}

//隐藏商品展示页面
function hideLayout1() {
    $('#commodity_about').hide()
    $('#commodity_info').show()
    $('#recommend').show()
    $('#recommend_info').show()
}

//隐藏详细商品展示页面
function hideLayout2() {
    $('#commodity_info').hide()
    $('#commodity_about').show()
    $('#recommend').hide()
    $('#recommend_info').hide()
}