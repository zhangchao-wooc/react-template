import request from './request'

const demo = () => {
  return request({
    url: '/home'
  })
}

export default {
  demo
}
