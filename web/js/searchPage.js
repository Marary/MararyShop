
//初始加载页面时加载所有商品
function loadAll(keyword, data_length) {
    var classify = document.getElementById('classify');

    document.addEventListener('scroll', function () {
        classify.style.marginTop = '80px'
    })

    getAllItem(keyword, data_length)

}

function getAllItem(keyword, data_length) {
    keyword = JSON.parse(keyword)
    if (keyword === 'failure' && data_length === 0) {
        let Data = '<div>暂无搜索内容</div>'
        document.getElementById("commodity_1").innerHTML = Data;
    } else if (keyword === 'all') {
        axios({
            method: "get",
            url: "http://localhost:726/marary/selectServlet",
            responseType: 'json',//解决问题的一条语句
            traditional: true,
            dataType: 'json',
            params: {
                page: this.page
            }
        }).then((response) => {
            let datas = response.data

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
        })
    } else if (data_length === 1) {
        showGoods(keyword)
    } else if (data_length === 2) {
        showItemFromMain(keyword)
    }

}

