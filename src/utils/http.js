import Taro from '@tarojs/taro'
import navigationLoading from './navigation-loading'
import mockDataMap from './mockDataMap'

const baseUrl = 'https://api.utoohappy.com'

export default (options = { method: 'GET', data: {}}) => {
  if(options.url.indexOf('/mock/') > -1) {
    return Promise.resolve(mockDataMap[options.url].data)
  }
  navigationLoading.start()
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'content-Type': 'application/json',
      'token': Taro.getStorageSync('token')
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    navigationLoading.done()
    const { status, data } = res.data || {}
    if (status === 200) {
      return data
    } else {
      return Promise.reject(res)
    }
  }).catch((err) => {
    navigationLoading.done()
    let msg = '服务异常'
    if (err.data && err.data.message) {
      msg = err.data.message
    } else if (err.status === 403) {
      msg = '登录过期, 请重新登录'
      setTimeout(() => {
        Taro.reLaunch({
          url: '/pages/login/index'
        })
      }, 1000)
    }
    Taro.showToast({
      title: msg,
      icon: 'none',
      mask: true,
    })
    return Promise.reject(err)
  })
}
