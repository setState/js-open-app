// 绑定事件
export const bind = function(dom, event, fun) { // bind event
    if (dom.addEventListener) {
        dom.addEventListener(event, fun, !1)
    } else if (dom.attachEvent) {
        dom.attachEvent(event, fun)
    } else {
        throw new Error('不存在的方法')
    }
}

// 格式化url
export const formatUrl = function(url, params){
    var arr = []
    for (var p in params) {
        if (p && params[p]) {
            arr.push(p + '=' + encodeURIComponent(params[p]))
        }
    }
    arr = arr.join('&');
    var u = url.split("?");
    var newUrl = null;
    if (u.length == 2) {
        newUrl = u[0] + "?" + u[1] + "&" + arr
    } else {
        newUrl = u[0] + "?" + arr
    }
    return newUrl;
}

//使用计算时差的方案打开APP
export const checkOpen = function(cb) {
    var _clickTime = +(new Date());

    function check(elsTime) {
        if (elsTime > 3000 || document.hidden || document.webkitHidden) {
            cb(1);
        } else {
            cb(0);
        }
    }

    //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
    var _count = 0, intHandle;
    intHandle = setInterval(function () {
        _count++;
        var elsTime = +(new Date()) - _clickTime;
        if (_count >= 100 || elsTime > 3000) {
            clearInterval(intHandle);
            check(elsTime);
        }
    }, 20);
}

