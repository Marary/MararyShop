window.onload = function () {
    showOrder();
}


function jumpToDetail(jump) {
    //获取order信息
    let order = $(jump).parent().parent(".orderItem").val()

    if (localStorage.length !== 0)
        localStorage.clear()
    localStorage.setItem('order', JSON.stringify(order))

    this.location.href = 'http://localhost:0726/marary/orderDetail.html'

}

function showOrder() {
    //发送请求
    axios({
        method: "get",
        url: "http://localhost:0726/marary/orderServlet",
        responseType: 'json',//解决问题的一条语句
        traditional: true,
        dataType: 'json',
        params: {
            page: this.page
        }
    }).then((response) => {


        //获取数据
        let orders = response.data;

        if (orders === 'empty') {

            var buyLink = document.createElement('div');
            buyLink.textContent = "123";
            $(function () {
                $('order_info').children().remove()
                $('order_info').appendChild(buyLink);
            })


            // var buyLink = document.createElement('div');
            // buyLink.className = "jump warp";
            //  tableOrder += "<div class='jump warp'><li><a href='http://localhost:8080/marary/home.html'>马上购物</a></li> </div>"


        } else {

            var tableBody = document.getElementById("tableBody");
            for (let i = 0; i < orders.length; i++) {
                let order = orders[i];

                //tr
                var orderItem = document.createElement('tr');
                orderItem.className = "orderItem"
                orderItem.value = order
                tableBody.appendChild(orderItem);
                //td
                var name = document.createElement('td');
                var image = document.createElement('img')
                image.src = order.url;
                image.className = "imgItem";
                image.onclick = function () {
                    jumpToItem(this)
                }
                var nameLabel = document.createElement('label')
                nameLabel.textContent = order.animalName
                nameLabel.value = order.animalName
                nameLabel.className = "animalName"
                name.appendChild(image);
                name.appendChild(nameLabel);


                var price = document.createElement('td');
                price.textContent = order.price;
                var number = document.createElement('td');
                number.textContent = order.column;
                var total = document.createElement('td');
                total.textContent = order.price * order.column;
                var time = document.createElement('td');
                time.textContent = order.date;
                var order_number = document.createElement('td');
                order_number.textContent = order.order_number;
                order_number.className = "order_number"
                order_number.value = order.order_number
                // console.log(order_number.value)

                var operation = document.createElement('td');
                var remove = document.createElement('a');
                remove.href = "#"
                remove.textContent = "删除"
                remove.onclick = function () {
                    checkTest(this)
                }
                var view = document.createElement('a');
                view.href = "#"
                view.textContent = "查看"
                view.onclick = function () {
                    jumpToDetail(this)
                }
                var space = document.createElement('label');
                space.textContent = "    "

                operation.appendChild(view)
                operation.appendChild(space)
                operation.appendChild(remove)

                orderItem.appendChild(name);
                orderItem.appendChild(price);
                orderItem.appendChild(number);
                orderItem.appendChild(total);
                orderItem.appendChild(time);
                orderItem.appendChild(order_number);
                orderItem.appendChild(operation);
            }


            //实现分页效果
            $(function () {
                var $table = $('#orderTable');
                var currentPage = 0;//当前页默认值为0
                var pageSize = 5;//每一页显示的数目
                $table.bind('paging', function () {
                    $table.find('tbody tr').hide().slice(currentPage * pageSize, (currentPage + 1) * pageSize).show();
                });
                var sumRows = $table.find('tbody tr').length;
                var sumPages = Math.ceil(sumRows / pageSize);//总页数

                var $pager = $('<div class="page" id="pager"></div>');  //新建div，放入a标签,显示底部分页码


                for (var pageIndex = 0; pageIndex < sumPages; pageIndex++) {
                    $('<a href="#" id="pageStyle" onclick="changCss(this)"><span>' + (pageIndex + 1) + '</span></a>').bind("click", {"newPage": pageIndex}, function (event) {
                        currentPage = event.data["newPage"];
                        $table.trigger("paging");
                        //触发分页函数

                    }).appendTo($pager);
                    $pager.append(" ");
                }

                $pager.insertAfter($table)
                $table.trigger("paging");

                //默认第一页的a标签效果
                var $pagess = $('#pageStyle');
                $pagess[0].style.backgroundColor = "#9980FA";
                $pagess[0].style.color = "#ffffff";
            });


        }


    }).catch(function (error) {
        console.log(error)
    })
}


function checkTest(remove) {
    deleteItem($(remove).parent().siblings(".order_number").val())
}

function jumpToItem(jump) {
    mainPageSelectGoods($(jump).siblings(".animalName").val())
}

function deleteItem(order_number) {
    const config = {
        headers: {
            contentType: 'application/json;charset=utf-8',
            responseType: 'json',
            traditional: true,
            dataType: 'json',
        }
    }
    const url = "http://localhost:0726/marary/deleteOrderServlet"

    axios.post(url, JSON.stringify({'order_number': order_number}), config).then(resp => {
        let result = resp.data
        console.log(result)
        if (result === 'success') window.location = "http://localhost:0726/marary/orderPage.html"
        // showOrder()
    })
}


function mainPageSelectGoods(keyword) {

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
        const url = "http://localhost:0726/marary/searchGoodsServlet"

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
            this.location.href = 'http://localhost:0726/marary/searchPage.html'
        })
    } else {
        localStorage.setItem('goods', JSON.stringify('all'))
        this.location.href = 'http://localhost:0726/marary/searchPage.html'
    }


}

//a链接点击变色，再点其他回复原色
function changCss(obj) {
    var arr = document.getElementsByTagName("a");
    for (var i = 0; i < arr.length; i++) {
        if (obj == arr[i]) {       //当前页样式
            obj.style.backgroundColor = "#006B00";
            obj.style.color = "#ffffff";
        } else {
            arr[i].style.color = "";
            arr[i].style.backgroundColor = "";
        }
    }
}