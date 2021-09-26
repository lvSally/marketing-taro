import { useEffect } from 'react'
import Taro, {useRouter} from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import httpRequest from '@http'
import './index.scss'

const logo = 'https://cdn.utoohappy.com/mini/logo.png'
export default function Login() {
  const history = useRouter()
  useEffect(() => {
    Taro.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        Taro.setStorageSync('code', res.code)
      }
    })
  }, [])

  //微信手机号登录
  const getPhoneNumber = (e) => {
    const { iv, encryptedData } = e.detail
    const options = {
      method: 'post',
      url: '/api/user/simple/login',
      data: {
        code: Taro.getStorageSync('code'),
        iv,
        encryptedData
      }
    }
    httpRequest(options).then(data => {
      Taro.setStorageSync('token', data.token)

      const redirectUrl = history.params.redirect
      if (redirectUrl) {
        Taro.reLaunch({
          url: '/' + redirectUrl
        })
      } else {
        Taro.reLaunch({
          // url: '/pages/index/index'
          url: '/pages/discount/index'
        })
      }
    })
  }

  return (
    <View className='page-login'>
      <Image className='logo' src={logo} />
      {/* <View className='title'>来一桶足浴</View> */}
      <AtButton type='primary' openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>微信一键登录</AtButton>
      {/* <View className='protocol-wrap'> <Image className='icon' src={selectIcon} /> 注册或登录即代表你同意<Text className='link' onClick={() => Taro.navigateTo({ url: '/pages/protocol/index?type=2' })}>《隐私协议》</Text></View> */}
    </View>
  )
}