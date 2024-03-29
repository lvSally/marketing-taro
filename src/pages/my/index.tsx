import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import CustomTabar from '@src/components/customTabar'
import Taro, { useDidShow } from '@tarojs/taro'
import httpRequest from '@http'
import { encryptPhone, linkToLogin } from '@src/utils/tools'
import Skeleton from 'taro-skeleton'
import './index.scss'

const avatar = 'https://cdn.utoohappy.com/mini/avatar.png'
function Index() {
  const [userInfo, setUserInfo] = useState({
    couponCount: '--',
    credits: '--',
    phone: undefined
  })
  const [loading, setLoading] = useState(false)
  useDidShow(() => {
    getUserInfo()
  })

  const getUserInfo = () => {
    setLoading(true)
    httpRequest({
      method: 'get',
      url: '/api/user/myInfo',
      noLogin: true,
      noMessage: true
    }).then(data => {
      setUserInfo({
        couponCount: data?.couponCount,
        credits: data?.credits,
        phone: data?.phone
      })
    }).finally(() => {
      setLoading(false)
    })
  }
  const linkTo = function(url?) {
    if(linkToLogin('pages/my/index')) return // 处理token为空
    Taro.navigateTo({
      url
    })
  }

  return (
    <View className='page-user'>
      {!loading && <View className='user-card'>
        {
          userInfo.phone 
          ? 
            <View className='user-basic'>
              <Image src={avatar} />
              <Text>{encryptPhone(userInfo.phone)}</Text>
              <Text className='degree'>会员</Text>
            </View>
           : <View className='no-login-tip' onClick={() => linkTo()}>点击登录后查看</View>
        }
        <View className='bottom-content'>
          <View className='block' onClick={() => linkTo(`/pages/my/grade?credits=${userInfo.credits}`)}>
            <View className='number'>{userInfo.credits === undefined ? '-' : userInfo.credits}</View>
            <View>积分</View>
          </View>
          <View className='block' onClick={() => linkTo('/pages/my/discount')}>
            <View className='number'>{userInfo.couponCount === undefined ? '-' : userInfo.couponCount}</View>
            <View>优惠券</View>
          </View>
        </View>
      </View>}
      {loading && <Skeleton title avatarShape='square' row={4} rowHeight={48} />}
      <View className='book-record' onClick={() => linkTo('/pages/my/record')}>
        <Text>预约记录</Text>
        <Text className='at-icon at-icon-chevron-right'></Text>
      </View>
      <CustomTabar active='my' />
    </View>
  )
}

export default Index
