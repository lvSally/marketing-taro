import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import defaultImg from '@image/default1.png'
import './index.scss'

export default function ProjectList() {
  const linkTo = function(id) {
    Taro.navigateTo({
      url: `/pages/store/index?id=${id}`
    })
  }

  return <View className='custom-introduce-content'>
    <View className='block-list' onClick={() => linkTo(123)}>
      <Image className='left' src={defaultImg} />
      <View className='flex-column'>
        <View>
          <View>经典足道</View>
          <View>揉、刮、搓三大特色手法</View>
        </View>
        <View>￥158 / 60分钟</View>
      </View>
    </View>
    <View className='block-list' onClick={() => linkTo(123)}>
      <Image className='left' src={defaultImg} />
      <View className='flex-column'>
        <View>
          <View>经典足道</View>
          <View>揉、刮、搓三大特色手法</View>
        </View>
        <View>￥158 / 60分钟</View>
      </View>
    </View>
    <View className='block-list' onClick={() => linkTo(123)}>
      <Image className='left' src={defaultImg} />
      <View className='flex-column'>
        <View>
          <View>经典足道</View>
          <View>揉、刮、搓三大特色手法</View>
        </View>
        <View>￥158 / 60分钟</View>
      </View>
    </View>
  </View>
}