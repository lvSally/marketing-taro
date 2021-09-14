import { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import httpRequest from '@http'
// import selectIcon from '@image/select.png'
import logo from '@image/logo.png'
import './index.scss'

export default function Login() {
  useEffect(() => {
    Taro.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        Taro.setStorageSync('code', res.code)
        console.log(res.code)
      }
    })
  }, [])

  //微信手机号登录
  const getPhoneNumber = (e) => {
    console.log(e)
    const { iv, encryptedData } = e.detail
    console.log(`code: ${Taro.getStorageSync('code')}, iv: ${iv}, encryptedData: ${encryptedData}`)
    const options = {
      method: 'POST',
      url: '/api/user/miniLogin',
      data: {
        code: Taro.getStorageSync('code'),
        iv,
        encryptedData
      }
    }
    httpRequest(options).then(res => {
      Taro.setStorageSync('token', res.data)
      Taro.reLaunch({
        url: '/pages/home/index'
      })
    })
  }

  return (
    <View className='page-login'>
      <Image className='logo' src={logo} />
      <View className='title'>来一桶足浴</View>
      <AtButton type='primary' openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>微信一键登录</AtButton>
      {/* <View className='protocol-wrap'> <Image className='icon' src={selectIcon} /> 注册或登录即代表你同意<Text className='link' onClick={() => Taro.navigateTo({ url: '/pages/protocol/index?type=2' })}>《隐私协议》</Text></View> */}
    </View>
  )
}