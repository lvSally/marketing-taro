import { View, Text, Image } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import Taro from '@tarojs/taro'
import avatar from '@image/avatar.png'
import './index.scss'

function Index() {
  const linkTo = function(url) {
    Taro.navigateTo({
      url
    })
  }

  return (
    <View className='page-user'>
      <View className='user-card'>
        <View className='user-basic'>
          <Image src={avatar} />
          <Text>188****4421</Text>
          <Text className='degree'>会员</Text>
        </View>
        <View className='bottom-content'>
          <View className='block' onClick={() => linkTo('/pages/my/grade')}>
            <View className='number'>500</View>
            <View>积分</View>
          </View>
          <View className='block' onClick={() => linkTo('/pages/my/discount')}>
            <View className='number'>1</View>
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
