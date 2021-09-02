import { View, ScrollView, Text } from '@tarojs/components'
import { useState } from 'react'
import './discount.scss'

export default function Discount() {
  const [curentList, setCurentList] = useState<'useable' | 'used' | 'expire'>('useable')

  const onScrollToLower = () => {
    console.log('end')
  }

  return (
    <View className='page-discount'>
      <View className='custom-tab-wrap around'>
        <View className={`tab ${curentList === 'useable' ? 'active' : ''}`} onClick={() => setCurentList('useable')}>可使用</View>
        <View className={`tab ${curentList === 'used' ? 'active' : ''}`} onClick={() => setCurentList('used')}>已使用</View>
        <View className={`tab ${curentList === 'expire' ? 'active' : ''}`} onClick={() => setCurentList('expire')}>已过期</View>
      </View>
      <ScrollView
        className='list-content'
        scrollY
        scrollWithAnimation
        lowerThreshold={50}
        onScrollToLower={onScrollToLower}
      >
        <View className='custom-discount-list-block'>
          <View className='left'>7.5折</View>
          <View className='center'>
            <View className='inner-title'>足浴优惠券</View>
            <View>券号：202108241234</View>
          </View>
          <View className='right'></View>
          <View className='relative'>
            <View className='have'>2021/08/30 18:00</View>
            <View className='have'>过期</View>
          </View>
        </View>
        <View className='custom-discount-list-block used disabled'>
          <View className='left'>7.5折</View>
          <View className='center'>
            <View className='inner-title'>足浴优惠券</View>
            <View>券号：202108241234</View>
          </View>
          <View className='right'></View>
          <View className='relative'>
            <View className='have'>2021/08/30 18:00</View>
            <View className='have'>已使用</View>
          </View>
        </View>
        <View className='custom-discount-list-block expire disabled'>
          <View className='left'>7.5折</View>
          <View className='center'>
            <View className='inner-title'>足浴优惠券</View>
            <View>券号：202108241234</View>
          </View>
          <View className='right'></View>
          <View className='relative'>
            <View className='have'>2021/08/30 18:00</View>
            <View className='have'>过期</View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
