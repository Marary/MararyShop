window.onload = function () {
    checkStatus()
    //动画
    var div = document.getElementById("toolbox");
    var timer = null;
    div.onmouseover = function () {
        startMove(0);
    };
    div.onmouseout = function () {
        startMove(-130);
    };

    function startMove(targetPosition) {
        clearInterval(timer);
        var speed = 0;
        if (targetPosition < 0) {
            speed = -10;
        } else {
            speed = 10;
        }
        timer = setInterval(function () {
            if (div.offsetLeft == targetPosition) {
                clearInterval(timer);
            } else {
                div.style.left = div.offsetLeft + speed + 'px';
            }
        }, 17);
    }

    document.addEventListener('scroll', function () {
        div.style.position = "fixed"
        div.style.top = "75px"
    })

    let keyword;
    let data_length = localStorage.length
    if (localStorage.length === 0)
        keyword = JSON.stringify('all')
    else if (localStorage.length === 1) {
        keyword = localStorage.getItem('goods')
        localStorage.clear()
    } else if (localStorage.length === 2) {
        keyword = localStorage.getItem('item')
        localStorage.clear()
    }

    //加载全部商品
    loadAll(keyword, data_length)


};

