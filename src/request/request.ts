import axios from 'axios'
import { message } from 'antd'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

function errorHandle(error: {
  response: { status: any }
  code?: number | string
  message?: string | undefined
}) {
  if (error.response) {
    // 请求已发出，服务器响应状态码非 2xx
    const { status } = error.response
    if (status) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const errorText = codeMessage[status]
      message.error({
        content: `错误码 ${status}: ${errorText}`,
        duration: 2.5
      })
    }
  } else {
    message.error({
      content: `${error.code}: ${error.message}`,
      duration: 2.5
    })
  }
}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    errorHandle(error)
  }
)

export default axios
