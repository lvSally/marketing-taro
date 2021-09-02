import { View, ScrollView } from '@tarojs/components'
import './grade.scss'

export default function Grade() {
  const onScrollToLower = () => {
    console.log('end')
  }

  return (
    <ScrollView
      className='page-grade'
      scrollY
      scrollWithAnimation
      lowerThreshold={50}
      onScrollToLower={onScrollToLower}
    >
      <View className='title'>当前积分：500</View>
      <View className='list-block'>
        <View className='left'>
          <View>消费赠送</View>
          <View className='time'>2020/04/10 12:22</View>
        </View>
        <View className='right'>+50</View>
      </View>
      <View className='list-block'>
        <View className='left'>
          <View>消费赠送</View>
          <View className='time'>2020/04/10 12:22</View>
        </View>
        <View className='right'>-50</View>
      </View>
      <View className='list-block'>
        <View className='left'>
          <View>消费赠送</View>
          <View className='time'>2020/04/10 12:22</View>
        </View>
        <View className='right'>+50</View>
      </View>
      <View className='list-block'>
        <View className='left'>
          <View>消费赠送</View>
          <View className='time'>2020/04/10 12:22</View>
        </View>
        <View className='right'>+50</View>
      </View>
    </ScrollView>
  )
}
