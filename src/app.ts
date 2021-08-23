import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { setGlobalData } from '@globalData'

import './app.scss'

export default function App(props) {
  useEffect(() => {
    getSystemInfo()
  }, [])
// 判断手机型号
  const getSystemInfo = () => {
    Taro.getSystemInfo({}).then(res  => {
      // 判断是否为刘海屏
      const whiteList = ['iPhone X', 'iPhone 11', 'iPhone 12']
      if(whiteList.filter(item => res.model.search(item) != -1).length) {
        setGlobalData('isIPX', true)
      }

      setGlobalData('phoneModel', res.model)
    })
  }

  // this.props.children 是将要会渲染的页面
  return props.children
}
