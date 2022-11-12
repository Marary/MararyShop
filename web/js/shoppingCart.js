
//加载商品信息
window.onload = function () {
    showCart()
    checkStatusCart()
}

function showCart() {
    $('#cart_info').children().remove()
    //发送请求
    axios({
        method: "get",
        url: "http://localhost:726/marary/cartServlet",
        responseType: 'json',//解决问题的一条语句
        traditional: true,
        dataType: 'json',
        params: {
            page: this.page
        }
    }).then((response) =>{
        let tableDate = "<div class=\"tips warp\">\n" +
            "\n" +
            "    <ul>\n" +
            "        <li>\n" +
            "            <input type=\"checkbox\" class='allbox' name=\"fav\" id=\"all\" onclick=\"checkTest1(this),flush(this)\" />\n" +
            "            全选\n" +
            "        </li>\n" +
            "        <li>商品</li>\n" +
            "        <li>单价</li>\n" +
            "        <li>数量</li>\n" +
            "        <li>小计</li>\n" +
            "        <li>操作</li>\n" +
            "    </ul>\n" +
            "\n" +
            "\n" +
            "</div>"

        //获取数据
        let animals = response.data;
        if (animals === 'empty') {
            tableDate += "<div class='jump warp'><li><a href='http://localhost:726/marary/searchPage.html'>马上购物</a></li> </div>"
        } else {
            for (let i = 0; i < animals.length; i++) {
                let animal = animals[i];

                tableDate += "<div class=\"info warp\">\n" +
                    "\n" +
                    "    <ul>\n" +
                    "        <li class=\"info_1\"><input type=\"checkbox\" class='box'  name=\"fav\" onclick=\"flush(this)\"/> </li>\n" +
                    "        <li class=\"info_2\"> <img src=\"" + animal.url + "\" class=\"item_img\"/> </li>\n" +
                    "        <li class=\"info_3\" value=\"" + animal.id + "\"><a>" + animal.name + "</a></li>\n" +
                    "        <li class=\"info_4\"><a>类别：" + animal.type + ":" + animal.specific + "</a> </li>\n" +
                    "        <li class=\"info_5\">" + animal.price + "</li>\n" +
                    "        <li class=\"info_6\">\n" +
                    "            <button onclick=\"checkTest3(this,1)\">-</button>\n" +
                    "            <input type=\"text\" class='product_number' name=\"\"  value=\"" + animal.number + "\" />\n" +
                    "            <button class=\"bot\" onclick=\"checkTest3(this,2)\">+</button>\n" +
                    "\n" +
                    "        </li>\n" +
                    "        <li class=\"info_7\" value='" + animal.price * animal.number + "'>" + animal.price * animal.number + "</li>\n" +
                    "        <li>\n" +
                    "            <a href=\"#\" onclick=\"checkTest4(this)\">删除</a><br />\n" +
                    "        </li>\n" +
                    "    </ul>\n" +
                    "</div>"
            }
        }


        tableDate += "<div class=\"balance warp\">\n" +
            "\n" +
            "    <ul class=\"balance_ul1\">\n" +
            "        <li>\n" +
            "\n" +
            "            <input type=\"checkbox\" class='allbox' name=\"fav\" id=\"\" value=\"\"  onclick=\"checkTest1(this),flush(this)\"/>\n" +
            "            全选\n" +
            "        </li>\n" +
            "        <li><a>删除选中商品</a></li>\n" +
            "    </ul>\n" +
            "\n" +
            "    <ul class=\"balance_ul2\">\n" +
            "\n" +
            "        <li>已经选择<span id=\"snum\">0</span>件商品</li>\n" +
            "        <li>总价 <span id=\"zongz\">￥0</span></li>\n" +
            "        <li>\n" +
            "            <button class=\"butt\" id='settlement' onclick='pay(this)'>去结算</button>\n" +
            "\n" +
            "        </li>\n" +
            "\n" +
            "    </ul>\n" +
            "\n" +
            "\n" +
            "</div>"

        $('#cart_info').html(tableDate)


    }).catch(function (error) {
        console.log(error)
    })
}

function pay(Window) {

    let array = []
    let length = $(Window).parent().parent().parent().siblings().length

    for (let i = 1; i < length; i++) {
        let product_id, product_number;
        product_id = $(Window).parent().parent().parent().siblings().eq(i).children().children('.info_3').val()
        product_number = $(Window).parent().parent().parent().siblings().eq(i).children().children('.info_6').children('.product_number').val()
        let status = $(Window).parent().parent().parent().siblings().eq(i).children().children('.info_1').children('.box').prop("checked")

        if (status)
            array.push([product_id, parseInt(product_number)])
    }

    console.log(array.length)
    if (array.length === 0) {
        //未选择商品
    } else {

        //TODO:结算
        var information = "提交了订单"
        axios.post("http://localhost:726/marary/addLogServlet", JSON.stringify({'information': information}));

        let keyword = {'info': array}

        //新增订单
        const config = {
            headers: {
                contentType: 'application/json;charset=utf-8',
                responseType: 'json',
                traditional: true,
                dataType: 'json',
            }
        }
        const url = "http://localhost:726/marary/addNewOrderServlet"

        axios.post(url, JSON.stringify(keyword), config).then(res => {
            let result = res.data
            if (result === 'success') {
                //跳转到结算页面
                window.location = "http://localhost:726/marary/payForItem.html"
            } else {
                //TODO:结算失败
                window.location = "http://localhost:726/marary/shoppingCart.html"
            }

        })
    }


}

function flush(Window) {
    let zongz = 0;
    let checkNum = 0
    let status = $(Window).prop('checked')
    let length = $(Window).parent().parent().parent().siblings().length
    if (status == true) {
        let price = $(Window).parent().siblings('.info_7').val()
        if (price !== undefined) {
            zongz += price
            checkNum += 1
        }
    }

    for (let i = 0; i < length; i++) {
        status = $(Window).parent().parent().parent().siblings().eq(i).children().children().children('.box').prop('checked')
        let price = $(Window).parent().parent().parent().siblings().eq(i).children().children().children('.box').parent().siblings('.info_7').val()
        if (status == true) {
            zongz += price
            checkNum += 1
        }
    }
    $('#snum').html(checkNum)
    $('#zongz').html(zongz)

}

function changeCartNum(number, id) {
    const config = {
        headers: {
            contentType: 'application/json;charset=utf-8',
            responseType: 'json',
            traditional: true,
            dataType: 'json',
        }
    }
    const url = "http://localhost:726/marary/changeNumberServlet"

    let keyword = {number: number, id: id}


    axios.post(url, JSON.stringify(keyword), config).then(resp => {
        let result = resp.data
        if (result !== 'null')
            showCart()
    })
}

function deleteItem(id) {
    const config = {
        headers: {
            contentType: 'application/json;charset=utf-8',
            responseType: 'json',
            traditional: true,
            dataType: 'json',
        }
    }
    const url = "http://localhost:726/marary/deleteServlet"

    let keyword = {id: id}


    axios.post(url, JSON.stringify(keyword), config).then(resp => {
        let result = resp.data
        if (result !== 'null')
            showCart()
    })
}

function checkTest1(Window) {
    let status = $(Window).prop('checked')
    let length = $(Window).parent().parent().parent().siblings().length

    if (status == true) {

        for (let i = 0; i < length; i++) {
            $(Window).parent().parent().parent().siblings().eq(i).children().children().children('.allbox').prop('checked', true)
            $(Window).parent().parent().parent().siblings().eq(i).children().children().children('.box').prop('checked', true)
        }

    } else if (status == false) {

        for (let i = 0; i < length; i++) {
            $(Window).parent().parent().parent().siblings().eq(i).children().children().children('.allbox').prop('checked', false)
            $(Window).parent().parent().parent().siblings().eq(i).children().children().children('.box').prop('checked', false)
        }
    }


}

function checkTest3(item, number) {
    let now = $(item).siblings(".product_number").val()
    if (number === 1) {
        if (now > 1) {
            let number = now - 1
            changeCartNum(number, $(item).parent().siblings(".info_3").val())
        }

    } else if (number === 2)
        if (now <= 9) {
            let number = now - (-1)
            changeCartNum(number, $(item).parent().siblings(".info_3").val())
        }


}

function checkTest4(Window) {
    deleteItem($(Window).parent().siblings(".info_3").val())
}

//TODO:全选
$('#all').click(function () {

})


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
const config={
    headers:{
        contentType: 'application/json;charset=utf-8',
        responseType:'json',
        traditional:true,
        dataType:'json',
    }
}
const url="http://localhost:726/marary/searchServlet"

//关键字事件
$('#keyword').bind("input moneychangers",function () {
    let keyword = $('#keyword').val();
    if (keyword == null || keyword == ""){
        $('#show').hide()
        return ;
    }

    axios.post(url,JSON.stringify(keyword),config).then(resp=>{
        let datas=resp.data

        let results=""
        if (datas!=='failure'){
            if (datas.length<=10){
                for (let i = 0; i < datas.length; i++) {
                    results +="<span class='optional' >"+datas[i].name+"</span>"
                }
            }else {
                for (let i = 0; i < 10; i++) {
                    results +="<span class='optional'>"+datas[i].name+"</span>"
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

//搜索按键
$('#search').click(function () {

    let keyword = $('#keyword').val();
    if (keyword == null || keyword == ""){
        //TODO:错误提示信息
        console.log("输入不得为空?")
        $('#animalTable').hide()
        return false;
    }else{
        axios.post(url,JSON.stringify(keyword),config).then(res=>{
            //获取所有数据
            let datas=res.data
            //TODO:添加图片
            let results="<tr>\n" +
                "<th>图片</th>\n"+
                "    <th>序号</th>\n" +
                "    <th>编号</th>\n" +
                "    <th>名称</th>\n" +
                "    <th>库存</th>\n" +
                "    <th>价格</th>\n" +
                "</tr>\n";

            if (datas!=='failure'){
                if (datas.length===0){
                    //TODO:未搜索到提示
                    results = ""
                    $('#animalTable').hide()
                    console.log("未搜索到相关信息")
                }else {
                    for (let i = 0; i < datas.length; i++) {
                        let animal =datas[i]
                        results += "<tr align=\"center\">\n" +
                            "<td>"+"<img class='imgs' width='450px' height='300px' id='"+i+"' src='"+animal.url+"'"+">"+"</td>"+
                            "    <td>"+(i+1)+"</td>\n" +
                            "    <td>"+animal.id+"</td>\n" +
                            "    <td>"+animal.name+"</td>\n" +
                            "    <td>"+animal.number+"</td>\n" +
                            "    <td>"+animal.price+"</td>\n" +
                            "</tr>";


                    }
                    $('#animalTable').show()

                }
                $('#animalTable').html(results)
                if (datas.length>0){
                    for (let i = 0; i < datas.length; i++){
                        let animal =datas[i]
                        $('#0').val({"uid":animal.id,"uname":animal.name,"number":animal.number,"price":animal.price})
                    }
                    $('#0').click(function (){
                        //跳转到该产品的详细信息页面

                    })
                }

            }else{
                //TODO:错误提示
                $('#animalTable').hide()
                console.log("加载失败")
            }

        })
    }
})