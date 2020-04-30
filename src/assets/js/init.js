// 固定写法 函数名字可变
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady' , function() {
            callback(WebViewJavascriptBridge)
        }, false );
    }
    var userAgent = navigator.userAgent.toLowerCase();
    var isiOS = !!userAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/); //ios终端
    if (isiOS) {
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    }
}
setupWebViewJavascriptBridge(function(bridge){
    // Java 注册回调函数，第一次连接时调用 初始化函数
    bridge.init();
});
