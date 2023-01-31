import request from './request'

const demo = () => {
  return request({
    url: '/home'
  })
}

const querySelect = () => {
  return new Promise((resolve, reject) => {
    const res = {
      success: true,
      data: [
        {
          key: '1',
          value: '第一个'
        },
        {
          key: '2',
          value: '第二个'
        }
      ]
    }
    resolve(res)
  })
}

export default {
  demo,
  querySelect
}
