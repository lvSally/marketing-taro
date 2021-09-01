import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import defaultImg from '@image/default1.png'
import './index.scss'

export default function PersonList() {
  const linkTo = function(id) {
    Taro.navigateTo({
      url: `/pages/store/detail?type=person&id=${id}`
    })
  }

  return <View className='custom-introduce-content'>
    <View className='block-list flex-start' onClick={() => linkTo(123)}>
      <Image className='left' src={defaultImg} />
      <View className='right'>
        <View className='sub-title'>793母婴理疗师</View>
        <View>资深技师，10年推拿经验，高级产后恢复师</View>
      </View>
    </View>
    <View className='block-list flex-start' onClick={() => linkTo(123)}>
      <Image className='left' src={defaultImg} />
      <View className='right'>
        <View className='sub-title'>793母婴理疗师</View>
        <View>资深技师，10年推拿经验，高级产后恢复师</View>
      </View>
    </View>
    <View className='block-list flex-start' onClick={() => linkTo(123)}>
      <Image className='left' src={defaultImg} />
      <View className='right'>
        <View className='sub-title'>793母婴理疗师</View>
        <View>资深技师，10年推拿经验，高级产后恢复师</View>
      </View>
    </View>
  </View>
}