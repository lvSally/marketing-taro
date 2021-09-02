import { View, ScrollView } from '@tarojs/components'
import './record.scss'

export default function Record() {
  const onScrollToLower = () => {
    console.log('end')
  }

  return (
    <ScrollView
      className='page-record'
      scrollY
      scrollWithAnimation
      lowerThreshold={50}
      onScrollToLower={onScrollToLower}
    >
      <View className='list-block'>
        <View className='top'>
          <View className='title orange'>定制预约</View>
          <View className='light'>预约成功</View>
        </View>
        <View>来一桶旗舰店店名比较长最多2行·足疗项目·232资深理疗师·2020/04/10 23:00-次日01:00</View>
        <View className='light time'>2020/04/10 12:22</View>
      </View>
      <View className='list-block'>
        <View className='top'>
          <View className='title blue'>定制预约</View>
          <View className='light'>已取消</View>
        </View>
        <View>来一桶旗舰店店名比较长最多2行·足疗项目·232资深理疗师·2020/04/10 23:00-次日01:00</View>
        <View className='light time'>2020/04/10 12:22</View>
      </View>
    </ScrollView>
  )
}
