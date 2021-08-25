import { useState } from 'react'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'

import './index.scss'

export default function BookNormal() {
  
  return (
    <View className='book-normal'>
      <View className='normal-list mb40'>
        <View>预约门店:</View>
        <View className='empty content'>请选择</View>
      </View>
      <View className='normal-list'>
        <View>到店时间:</View>
        <View className='content'>2021/08/20 18:00</View>
      </View>
      <AtButton className='book-btn' type='primary' circle>预约</AtButton>
    </View>
  )
}

