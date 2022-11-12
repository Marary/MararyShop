$(function() {
    // 图片的下标
    var index = 0;
    // 图片的宽度
    var w = $('.main img').width();

    // 点击切换下一张图片
    $('.next').click(function() {
        index++;
        move();
        btnColor();
    });

    // 点击切换上一张图片
    $('.last').click(function() {
        index--;
        move();
        btnColor();
    });

    // 点击圆点切换图片
    $('.btns span').click(function(e) {
        index = $(this).index();
        move();
        btnColor();
    })

    // 图片移动函数
    function move() {
        if (index < 0) {
            index = 4;
            $('.main').animate({
                left: -w * (index + 1)
            }, 0)
        }
        // 根据下标移动图片
        $('.main').animate({
            left: -w * index
        });
        // 当图片移动到最后一张时
        if (index === 5) {
            index = 0;
            $('.main').animate({
                left: 0
            }, 0)
        }
    };

    // 圆点颜色随图片移动而改变
    function btnColor() {

        $('.btns span').eq(index).css({ backgroundColor: 'deepskyblue', color: '#fff' });
        $('.btns span').eq(index).siblings().css({ backgroundColor: '#ffffff80', color: '#000' });
    }

    // 定时器，自动轮播
    var timer = null;
    // 每隔2s切换下一张图片
    timer = setInterval(function() {
        index++;
        move();
        btnColor();
    }, 2000)

    // 鼠标移入清除定时器
    $('.box').mouseover(function() {
        clearInterval(timer);
    });

    // 鼠标移出开启定时器
    $('.box').mouseout(function() {
        timer = setInterval(function() {
            index++;
            move();
            btnColor();
        }, 2000)
    })

})
