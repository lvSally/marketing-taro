import { useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import dayjs from 'dayjs'
import http from '@http'
import NoData from '@src/components/noData'

import './grade.scss'

export default function Grade() {
  const [dataList, setDataList] = useState([])
  const [currentGrade, setCurrentGrade] = useState(0)
  useEffect(() => {
    queryCreditsTrans()
  }, [])

  const queryCreditsTrans = () => {
    http({
      method: 'get',
      url: '/mock/api/credits/queryCreditsTrans',
      data: {}
    }).then(data => {
      setCurrentGrade(data.current)
      setDataList(data.records)
    })
  }
  
  const onScrollToLower = () => {
    console.log('end')
  }

  return (
    <View>
      <ScrollView
        className='page-grade'
        scrollY
        scrollWithAnimation
        lowerThreshold={50}
        onScrollToLower={onScrollToLower}
      >
        <View className='title'>当前积分：{currentGrade}</View>
        {dataList.map((item, idx) => <View key={idx} className='list-block'>
          <View className='left'>
            <View>{item.action}</View>
            <View className='time'>{item.transDate ? dayjs(item.transDate).format('YYYY/MM/DD HH:mm') : '--'}</View>
          </View>
          <View className='right'>{item.amount > 0 ? `+${item.amount}` : item.amount}</View>
        </View>)}
      </ScrollView>
      {dataList.length === 0 && <NoData />}
    </View>
  )
}
