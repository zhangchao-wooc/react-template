import request from './request'

const loginOut = () => {
  return request({
    url: '/login/out',
    baseURL: '/accounts'
  })
}

const userInfoApi = () => {
  return request({
    url: '/acl/api/v1/buc/person'
  })
}

export default { loginOut, userInfoApi }
