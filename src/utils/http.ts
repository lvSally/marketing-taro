import Taro from '@tarojs/taro'
import navigationLoading from './navigation-loading'
import mockDataMap from './mockDataMap'

let baseUrl = 'https://tapi.utoohappy.com'
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.utoohappy.com'
}

interface IOption {
  method?: string
  data?: any
  noLogin?:boolean
  noMessage?: boolean
  url: string
}
export default (options: IOption) => {
  const {method='GET', noLogin=false, noMessage=false} = options
  if(options.url.indexOf('/mock/') > -1) {
    return Promise.resolve(mockDataMap[options.url]?.data)
  }
  navigationLoading.start()
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'content-Type': 'application/json',
      'token': Taro.getStorageSync('token')
    },
    method: method.toUpperCase() as any,
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
    if (err.data && err.data.data && err.data.data.message) {
      msg = err.data.data.message
    }
    if (!noLogin && err.data && err.data.data && +err.data.data.code === 1002) {
      msg = '登录过期, 请重新登录'
      setTimeout(() => {
        Taro.reLaunch({
          url: '/pages/login/index'
        })
      }, 1000)
    }
    if(!noMessage) {
      Taro.showToast({
        title: msg,
        icon: 'none',
        mask: true,
      })
    }
    return Promise.reject(err)
  })
}
