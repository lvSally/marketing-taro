import { View, Text, ScrollView } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import CustomAlert from '@src/components/customAlert'
import { useState } from 'react'
import './index.scss'

function Index() {
  const [visibleAlert, setVisibleAlert] = useState(false)
  const onScrollToLower = () => {
    console.log('end')
  }

  return (
    <ScrollView
      className='page-discount'
      scrollY
      scrollWithAnimation
      lowerThreshold={50}
      onScrollToLower={onScrollToLower}
      // onScroll={nScroll}
    >
      <View className='title'>到店优惠券</View>
      <View className='custom-discount-list-block'>
        <View className='left'>7折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
          <Text className='active'>立即领取</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7.5折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
        <Text className='have'>已领取</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
          <Text className='none'>已抢光</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
          <Text className='active'>立即领取</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7.5折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
        <Text className='have'>已领取</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
          <Text className='none'>已抢光</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
          <Text className='active'>立即领取</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7.5折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
        <Text className='have'>已领取</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
          <Text className='none'>已抢光</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
          <Text className='active'>立即领取</Text>
        </View>
      </View>
      <View className='custom-discount-list-block'>
        <View className='left'>7.5折</View>
        <View className='center'>
          <View className='inner-title'>足浴优惠券</View>
          <View>剩余99张</View>
          <View>每人限领1张，到店前台使用</View>
        </View>
        <View className='right'>
        <Text className='have'>已领取</Text>
        </View>
      </View>
      <View className='no-more'>没有更多了</View>

      <CustomAlert visible={visibleAlert} onClose={() => setVisibleAlert(false)}>
        <View className='pop-content'>
          <View className='title'>领取成功</View>
          <View className='custom-discount-list-block border'>
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
          <View className='desc'>
            <View>使用说明：</View>
            <View>1、优惠券可在“我的”-“优惠券”中查看，领取成功即开始计算有效期，请尽快使用以免过期</View>
            <View>2、到店付款时，请与前台说明并告知券号，核销优惠券享受优惠</View>
          </View>
        </View>
      </CustomAlert>
      <CustomTabar active='discount' />
    </ScrollView>
  )
}

export default Index
