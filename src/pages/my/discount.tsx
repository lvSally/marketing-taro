import { View, ScrollView, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import http from '@http'
import dayjs from 'dayjs'
import NoData from '@src/components/noData'
import './discount.scss'

type Istatus = 'useable' | 'used' | 'expire'
export default function Discount() {
  const [curentTab, setCurentTab] = useState<Istatus>('useable')
  const [dataList, setDataList] = useState({
    useable: {
      list: [],
      pageNo: 1
    },
    used: {
      list: [],
      pageNo: 1
    },
    expire: {
      list: [],
      pageNo: 1
    }
  })

  const classMap = {
    USEABLE: '',
    EXPIRE: 'expire disabled',
    USED: 'used disabled',
  }

  useEffect(() => {
    queryMyCoupon('useable')
  }, [])

  const queryMyCoupon = (type:Istatus) => {
    http({
      method: 'get',
      url: '/mock/api/coupon/info/queryMyCoupon',
      data: {
        type
      }
    }).then(data => {
      const newDataList = {...dataList}
      newDataList[type].list = data || []
      setDataList({
        ...dataList,
        ...newDataList
      })
    })
  }

  const changeCoupon = (type:Istatus) => {
    setCurentTab(type)
    if(!dataList[type].list.length) {
      queryMyCoupon(type)
    }
  }

  const onScrollToLower = () => {
    console.log('end')
  }

  return (
    <View className='page-discount'>
      <View className='custom-tab-wrap around'>
        <View className={`tab ${curentTab === 'useable' ? 'active' : ''}`} onClick={() => changeCoupon('useable')}>可使用</View>
        <View className={`tab ${curentTab === 'used' ? 'active' : ''}`} onClick={() => changeCoupon('used')}>已使用</View>
        <View className={`tab ${curentTab === 'expire' ? 'active' : ''}`} onClick={() => changeCoupon('expire')}>已过期</View>
      </View>
      <ScrollView
        className='list-content'
        scrollY
        scrollWithAnimation
        lowerThreshold={50}
        onScrollToLower={onScrollToLower}
      >
        {
          dataList[curentTab].list.map(item => <View key={item.couponId} className={`custom-discount-list-block ${classMap[item.status]}`}>
            <View className='left'>{item.discount}折</View>
            <View className='center'>
              <View className='inner-title'>{item.couponName}</View>
              <View>券号：{item.couponId}</View>
            </View>
            <View className='right'></View>
            <View className='relative'>
              <View className='have'>{item.status === 'USED' ? item.usedTime && dayjs(item.usedTime).format('YYYY/MM/DD HH:mm') : item.expireTime && dayjs(item.expireTime).format('YYYY/MM/DD HH:mm')}</View>
              <View className='have'>{item.status === 'USED' ? '已使用' : '过期'}</View>
            </View>
          </View>)
        }
      </ScrollView>
      {dataList[curentTab].list.length === 0 && <NoData />}
    </View>
  )
}
