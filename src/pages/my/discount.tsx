import { View, ScrollView, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import http from '@http'
import dayjs from 'dayjs'
import NoData from '@src/components/noData'
import './discount.scss'

type Istatus = 'USABLE' | 'USED' | 'EXPIRE'
export default function Discount() {
  const [curentTab, setCurentTab] = useState<Istatus>('USABLE')
  const [dataList, setDataList] = useState({
    USABLE: {
      list: [],
      pageNo: 1
    },
    USED: {
      list: [],
      pageNo: 1
    },
    EXPIRE: {
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
    queryMyCoupon('USABLE')
  }, [])

  const queryMyCoupon = (status:Istatus) => {
    http({
      method: 'get',
      url: '/api/coupon/info/queryMyCoupon',
      data: {
        status
      }
    }).then(data => {
      const newDataList = {...dataList}
      newDataList[status].list = data || []
      setDataList({
        ...dataList,
        ...newDataList
      })
    })
  }

  const changeCoupon = (type:Istatus) => {
    setCurentTab(type)
    queryMyCoupon(type)
  }

  const onScrollToLower = () => {
    console.log('end')
  }

  return (
    <View className='page-discount'>
      <View className='custom-tab-wrap around'>
        <View className={`tab ${curentTab === 'USABLE' ? 'active' : ''}`} onClick={() => changeCoupon('USABLE')}>可使用</View>
        <View className={`tab ${curentTab === 'USED' ? 'active' : ''}`} onClick={() => changeCoupon('USED')}>已使用</View>
        <View className={`tab ${curentTab === 'EXPIRE' ? 'active' : ''}`} onClick={() => changeCoupon('EXPIRE')}>已过期</View>
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
              <View className='inner-title mb16 mt16'>{item.couponName}</View>
              <View className='inner-title'>券号：{item.couponId}</View>
            </View>
            <View className='right'></View>
            <View className='relative'>
              <View className='have'>{item.status === 'USED' ? item.usedTime && dayjs(item.usedTime).format('YYYY/MM/DD HH:mm') : item.expireTime && dayjs(item.expireTime).format('YYYY/MM/DD HH:mm')} {item.status === 'USED' ? '已使用' : '过期'}</View>
            </View>
          </View>)
        }
      </ScrollView>
      {dataList[curentTab].list.length === 0 && <NoData />}
    </View>
  )
}
