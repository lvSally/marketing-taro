import { AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'

import './index.scss'

export default function BookCustom() {
  
  return (
    <View className='book-custom'>
      <View className='desc'>
        可以<Text className='blod'>自由定制选择服务项目、技师和时间</Text>点击下方按钮立即开始定制吧~
      </View>
      
      <AtButton className='book-btn' type='primary' circle>开始定制预约</AtButton>
    </View>
  )
}

