import { View, Text, ScrollView } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import CustomAlert from '@src/components/customAlert'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import http from '@http'
import './index.scss'

function Index() {
  const [visibleAlert, setVisibleAlert] = useState(false)
  const [couponList, setCouponList] = useState([])
  const [currentCoupon, setCurrentCoupon] = useState(undefined)

  const statusMap = {
    active: {
      type: 'active',
      txt: '立即领取',
    },
    have: {
      type: 'have',
      txt: '已领取',
    },
    none: {
      type: 'none',
      txt: '已抢光',
    },
  }

  const onScrollToLower = () => {
    console.log('end')
  }

  useEffect(() => {
    queryCouponList()
  }, [])

  const queryCouponList = () => {
    http({
      method: 'get',
      url: '/mock/api/coupon/info/listConfigCoupon',
      data: {}
    }).then(data => {
      setCouponList(data || [])
    })
  }

  const getCoupon = (item) => {
    if(item.status !== 'active') {
      return
    }
    // todo: 调用领取接口
    setCurrentCoupon(item)
    setVisibleAlert(true)
  }

  return (
    <View className='page-discount'>
      <ScrollView
        className='pb160'
        scrollY
        scrollWithAnimation
        lowerThreshold={50}
        onScrollToLower={onScrollToLower}
      >
        <View className='title'>到店优惠券</View>
        {
          couponList.map(item => <View key={item.couponId} className='custom-discount-list-block'>
          <View className='left'>{item.discount}折</View>
          <View className='center'>
            <View className='inner-title'>{item.couponName}</View>
            <View>剩余{item.amount}张</View>
            <View>每人限领1张，到店前台使用</View>
          </View>
          <View className='right'>
            <Text className={statusMap[item.status]?.type} onClick={() => getCoupon(item)}>{statusMap[item.status]?.txt}</Text>
          </View>
        </View>)
        }
        
        <View className='no-more'>没有更多了</View>

        {!!currentCoupon && <CustomAlert visible={visibleAlert} onClose={() => setVisibleAlert(false)}>
          <View className='pop-content'>
            <View className='title'>领取成功</View>
            <View className='custom-discount-list-block border'>
              <View className='left'>{currentCoupon.discount}折</View>
              <View className='center'>
                <View className='inner-title'>{currentCoupon.couponName}</View>
                <View>券号：{currentCoupon.couponId}</View>
              </View>
              <View className='right'></View>
              <View className='relative'>
                <View className='have'>{currentCoupon.expireTime ? dayjs(currentCoupon.expireTime).format('YYYY/MM/DD HH:mm') : '--'}</View>
                <View className='have'>过期</View>
              </View>
            </View>
            <View className='desc'>
              <View>使用说明：</View>
              <View>1、优惠券可在“我的”-“优惠券”中查看，领取成功即开始计算有效期，请尽快使用以免过期</View>
              <View>2、到店付款时，请与前台说明并告知券号，核销优惠券享受优惠</View>
            </View>
          </View>
        </CustomAlert>}
        
      </ScrollView>
      <CustomTabar active='discount' />
    </View>
  )
}

export default Index
