import axios,{type AxiosRequestConfig, AxiosResponse} from 'axios'
import adapter from 'axios-miniprogram-adapter'
const request = axios.create({
    //请求路径统一加上"#{baseURL}"前缀
    baseURL: 'http://localhost:8080',
    timeout: 30000,
	adapter: adapter,
})
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset = utf-8';

    //config.headers['token'] = books.token;  //设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    reponse => {
        let res = reponse.data;
        // 兼容服务器返回的字符串数据
        if (typeof res === 'String') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // 控制台打印（调试用）
        return Promise.reject(error)
    }
)


export default request
