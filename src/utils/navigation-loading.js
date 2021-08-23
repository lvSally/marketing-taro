/**
 * http请求时，navigation-loading的计数
 */

import Taro from '@tarojs/taro'

let timeouterID
let counter = 0

export default {
  start() {
    // loading计数器加1
    counter++

    // 定时器若已存在，则不再处理lodaing的显示
    if (!timeouterID) {
      Taro.showNavigationBarLoading()
    }
  },

  /**
   * 隐藏loading
   * 减少计算器，当减少至0时，隐藏弹窗
   */
  done() {
    counter--

    // 计数器为0时
    if (counter > 0) return false

    // 设置结束时间
    clearTimeout(timeouterID)
    timeouterID = undefined
    Taro.hideNavigationBarLoading({})
  },
}
