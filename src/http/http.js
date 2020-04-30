import axios from 'axios'
import Qs from 'qs'
import store from '@/store'
import { host } from "@/env"
import err from './err'

const http = axios.create({
    timeout: 1000 * 12,
    baseURL: host,
});

http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 */
http.interceptors.request.use(
    config => {
        // config.headers['XPS-Sign'] = '';
        // config.headers['XPS-Token'] = store.state.token;
        // config.headers['XPS-Language'] = 'zh';
        if(Qs.stringify(config.data)){
            config.data = Qs.stringify(config.data)
        }
        return config;
    },
    error => Promise.error(error)
);

/**
 * 响应拦截器
 */
http.interceptors.response.use(
    res => {
        let data = res.data;
        if (data.code === '0') {
            return Promise.resolve(data.data);
        } else {
            err.errorHandle(data);
            return Promise.reject(data);
        }
    },
    // 请求失败
    error => {
        err.errorNetwork(error);
        return Promise.reject(error);
    }
);

export default http
