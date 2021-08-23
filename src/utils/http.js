import Taro from '@tarojs/taro'
import navigationLoading from './navigation-loading'

const baseUrl = ''

export default (options = { method: 'GET', data: {}}) => {
  navigationLoading.start()
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'content-Type': 'application/json',
      'X-Access-Token': Taro.getStorageSync('token')
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    navigationLoading.done()
    const { statusCode, data } = res
    if (statusCode >= 200 && statusCode < 300) {
      if (+data.code !== 200) {
        return Promise.reject(res)
      }
      return data
    } else {
      return Promise.reject(res)
    }
  }).catch((err) => {
    navigationLoading.done()
    let msg = '服务异常'
    if (err.data && err.data.msg) {
      msg = err.data.msg
    } else if (err.statusCode === 403) {
      msg = '登录过期, 请重新登录'
      setTimeout(() => {
        Taro.reLaunch({
          url: '/pages/login/login'
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
