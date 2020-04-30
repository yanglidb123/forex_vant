import router from '@/router'
import { Toast, Notify  } from 'vant'

const err = {
    /**
     * 请求失败后的错误统一处理
     */
    doCode: ['401', '5007', '4003'],
    errorHandle: function(data) {
        // Notify({ type: 'warning', message: data.data });
        Toast(data.msg);
        let code = data.code;
        if (this.doCode.includes(code)) {
            this[code](data);
        }
    },

    errorNetwork: function () {
        Toast.fail('网络错误');
    },
    /**
     * 跳转登录页
     * 携带当前页面路由，在登录页面完成登录后返回当前页面
     */
    toLogin: () => {
        router.replace({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        });
    },
    ['5007']: data => {
        console.log('401得错误 errMethods', data);
    },
    ['4003']: data => {
        console.log('401得错误 errMethods', data);
    },

};

export default err
