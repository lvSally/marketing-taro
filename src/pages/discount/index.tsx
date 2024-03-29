import { View, Text, ScrollView } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import CustomAlert from '@src/components/customAlert'
import Skeleton from 'taro-skeleton'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import http from '@http'
import Nodata from '@src/components/noData'
import { linkToLogin } from '@src/utils/tools'
import './index.scss'

function Index() {
  const [visibleAlert, setVisibleAlert] = useState(false)
  const [couponList, setCouponList] = useState([])
  const [currentCoupon, setCurrentCoupon] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [getCouponLoading, setGetCouponLoading] = useState(false)

  const onScrollToLower = () => {
    console.log('end')
  }

  useEffect(() => {
    queryCouponList()
  }, [])

  const queryCouponList = () => {
    setLoading(true)
    http({
      method: 'get',
      url: '/api/coupon/info/listConfigCoupon',
    }).then(data => {
      setCouponList(data || [])
    }).finally(() => {
      setLoading(false)
    })
  }

  const getCoupon = (item) => {
    if(linkToLogin('pages/discount/index')) return // 处理token为空

    if(item.currentStock === 0 || item.isReceive === 1) {
      return
    }
    if(getCouponLoading) {
      return
    }
    setGetCouponLoading(true)
    http({
      method: 'post',
      url: `/api/coupon/info/receive/${item.packageId}`,
      data: {}
    }).then((data) => {
      queryCouponList() // 刷新优惠券列表
      setCurrentCoupon(data)
      setVisibleAlert(true)
    }).finally(() => {
      setGetCouponLoading(false)
    })
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
        <View className='title'>到店优惠券<Text className='sub-title'>(仅限大桶大会员使用)</Text></View>
        {
          couponList.map(item => <View key={item.packageId} className='custom-discount-list-block'>
          <View className='left'>{item.discount}折</View>
          <View className='center2'>
            <View className='inner-title mb16'>{item.couponName}</View>
            <View>剩余{item.currentStock}张</View>
          </View>
          <View className='right'>
            <Text className={item.currentStock === 0 ? 'none' : item.isReceive === 1 ? 'have' : 'active'} onClick={() => getCoupon(item)}>{item.currentStock === 0 ? '已抢光' : item.isReceive === 1 ? '本周已领取' : '立即领取'}</Text>
          </View>
        </View>)
        }
        {loading && [1,2, 3, 4, 5].map(idx => <Skeleton key={idx} title avatar avatarShape='square' row={4} />)}
        
        {false && <View className='no-more'>没有更多了</View>}
      </ScrollView>
      {!loading && couponList.length === 0 && <Nodata />}
      {!!currentCoupon && <CustomAlert visible={visibleAlert} onClose={() => setVisibleAlert(false)}>
          <View className='pop-content'>
            <View className='title'>领取成功</View>
            <View className='custom-discount-list-block border'>
              <View className='left'>{currentCoupon.discount}折</View>
              <View className='center'>
                <View className='inner-title mt16 mb16'>{currentCoupon.couponName}</View>
                <View className='inner-title'>券号：{currentCoupon.couponId}</View>
              </View>
              <View className='right'></View>
              <View className='relative'>
                <View className='have'>{currentCoupon.expireTime ? dayjs(currentCoupon.expireTime).format('YYYY/MM/DD HH:mm') : '--'} 过期</View>
              </View>
            </View>
            <View className='desc'>
              <View>说明：</View>
              <View>1、单用户每周限领3张，数量有限，先到先得</View>
              <View>2、优惠券可在“我的”-“优惠券”中查看，领取成功即开始计算有效期，请尽快使用以免过期</View>
              <View>3、到店付款时，请与前台说明以便核销优惠券享受优惠</View>
            </View>
          </View>
        </CustomAlert>}
      <CustomTabar active='discount' />
    </View>
  )
}

export default Index
