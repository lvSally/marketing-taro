import { useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import dayjs from 'dayjs'
import http from '@http'

import './grade.scss'

export default function Grade() {
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    queryCreditsTrans()
  }, [])

  const queryCreditsTrans = () => {
    http({
      method: 'get',
      url: '/mock/api/credits/queryCreditsTrans',
      data: {}
    }).then(data => {
      setDataList(data.records)
    })
  }
  
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
      {dataList.map((item, idx) => <View key={idx} className='list-block'>
        <View className='left'>
          <View>{item.action}</View>
          <View className='time'>{item.transDate ? dayjs(item.transDate).format('DD/MM/YYYY HH:mm') : '--'}</View>
        </View>
        <View className='right'>{item.amount > 0 ? `+${item.amount}` : item.amount}</View>
      </View>)}
    </ScrollView>
  )
}
