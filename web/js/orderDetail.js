var user
var username
var phoneNum

window.onload = function () {
    getInfoAndShowDetail()
}

function getInfoAndShowDetail() {
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
        showOrderDetail();

    }).catch(function (error) {
        console.log(error)
    })
}

function showOrderDetail() {
    let order = JSON.parse(localStorage.getItem('order'))

    var imgItem = document.getElementById("imgItem")
    var label = document.getElementById("nameLabel")
    imgItem.src = order.url
    label.textContent = order.animalName

    var orderNumber = document.getElementById('orderNumber')
    var receiver = document.getElementById('receiver')
    var phone = document.getElementById('phone')
    var submitTime = document.getElementById('submitTime')
    var price = document.getElementById('price')
    var quantity = document.getElementById('quantity')
    var total = document.getElementById('total')
    var orderStatus = document.getElementById('orderStatus')

    orderNumber.textContent = order.order_number
    receiver.textContent = user.username
    phone.textContent = user.phoneNum
    submitTime.textContent = order.date
    price.textContent = order.price
    quantity.textContent = order.column
    total.textContent = order.price * order.column

    if (order.sign === true) orderStatus.textContent = "已完成"
    else orderStatus.textContent = "未完成"


}