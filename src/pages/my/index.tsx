import { View, Text, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import CustomTabar from '@src/components/customTabar'
import Taro from '@tarojs/taro'
import httpRequest from '@http'
import { encryptPhone, linkToLogin } from '@src/utils/tools'
import './index.scss'

const avatar = 'https://cdn.utoohappy.com/mini/avatar.png'
function Index() {
  const [userInfo, setUserInfo] = useState({
    couponCount: '--',
    credits: '--',
    phone: '--'
  })
  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = () => {
    httpRequest({
      method: 'get',
      url: '/api/user/myInfo',
      data: {}
    }).then(data => {
      setUserInfo({
        couponCount: data?.couponCount,
        credits: data?.credits,
        phone: data?.phone
      })
    })
  }
  const linkTo = function(url) {
    if(linkToLogin('pages/my/index')) return // 处理token为空
    Taro.navigateTo({
      url
    })
  }

  return (
    <View className='page-user'>
      <View className='user-card'>
        <View className='user-basic'>
          <Image src={avatar} />
          <Text>{encryptPhone(userInfo.phone || '')}</Text>
          <Text className='degree'>会员</Text>
        </View>
        <View className='bottom-content'>
          <View className='block' onClick={() => linkTo('/pages/my/grade')}>
            <View className='number'>{userInfo.credits || '-'}</View>
            <View>积分</View>
          </View>
          <View className='block' onClick={() => linkTo('/pages/my/discount')}>
            <View className='number'>{userInfo.couponCount || '-'}</View>
            <View>优惠券</View>
          </View>
        </View>
      </View>
      <View className='book-record' onClick={() => linkTo('/pages/my/record')}>
        <Text>预约记录</Text>
        <Text className='at-icon at-icon-chevron-right'></Text>
      </View>
      <CustomTabar active='my' />
    </View>
  )
}

export default Index
