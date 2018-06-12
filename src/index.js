import {
    bind,
    formatUrl,
    checkOpen
} from './util.js';

// 判断浏览器
const Navigator = navigator.userAgent;
const ifAndroid = (Navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
const ifIos = Navigator.match(/iPhone|iPad|iPd/i) ? true : false;

// 安卓版本号
let androidVersion = Navigator.match(/Android\s*(\d+)/);
androidVersion = androidVersion ? (androidVersion[1] || 0) : 0;

const iframe = "plugIn_downloadAppPlugIn_loadIframe";
let isIfr = false;

// 打开APP
const openApp = function (option) {
    var openLink = null,
        downloadUrl = null;
    if (ifIos) {
        openLink = option.iosLink || null
        // 开启应用宝跳转
        downloadUrl = (option.iosYyb || false) ? (option.yybDownloadUrl || null) : (option.iosDownloadUrl || null)
    } else if (ifAndroid) {
        openLink = option.androidLink || null
        // 开启应用宝跳转
        downloadUrl = (option.androidYyb || false) ? (option.yybDownloadUrl || null) : (option.androidDownloadUrl || null)
    }
    var params = option.params || []
    openLink = formatUrl(openLink, params) //格式化url 加参数
    // android5 及以上的高版本&& androidVersion >= 5
    if (ifAndroid && androidVersion >= 5) {
        var a = document.createElement("a"); //创建a元素
        a.setAttribute("href", openLink), a.style.display = "none", a.setAttribute("id", "aTag"), document.body.appendChild(a);
        document.getElementById('aTag').click();
    } else {
        window.location.href = downloadUrl;
    }
    // 设备是ios
    if (ifIos) {
        // 如果是自动跳转或者未开启Universal Link 用之前的链接 否则用 Universal Link
        // var iosUniversalLinkEnabled = (option.iosUniversalLinkEnabled || false) ? false : true
        // openLink = isAutoLaunchApp || iosUniversalLinkEnabled ? openLink : (option.ios9Link || null);

        setTimeout(function () {  // 必须要使用settimeout
            var a = document.createElement("a"); //创建a元素
            a.setAttribute("href", openLink), a.style.display = "none", a.setAttribute("id", "aTag"), document.body.appendChild(a);
            document.getElementById('aTag').click();
        }, 0);
    }

    checkOpen(function (opened) {
        // APP没有打开成功  并且开启自动跳转到下载页
        if (opened === 0 && option.autoRedirectToDownloadUrl) {
            window.location.href = downloadUrl;
        }
    });

}

// 初始化
export const init = function (option) {
    if (option.button) {
        option.button.setAttribute('href', 'javascript:void(0)')
        bind(option.button, 'click', function () {
            if (!isIfr) {
                var ifr = document.createElement("iframe");
                ifr.id = iframe;
                document.body.appendChild(ifr);
                document.getElementById(iframe).style.display = "none";
                document.getElementById(iframe).style.width = "0px";
                document.getElementById(iframe).style.height = "0px";
                isIfr = true
            }
            // 打开APP
            openApp(option)
        })
    }
}
