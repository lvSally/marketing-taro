import { useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import dayjs from 'dayjs'
import http from '@http'
import NoData from '@src/components/noData'
import { useRouter } from '@tarojs/taro'

import './grade.scss'

export default function Grade() {
  const [dataList, setDataList] = useState([])
  const params = useRouter().params
  useEffect(() => {
    queryCreditsTrans()
  }, [])

  const queryCreditsTrans = () => {
    http({
      method: 'get',
      url: '/api/credits/queryCreditsTrans',
      data: {
        pageSize: 100,
        pageNo: 1
      }
    }).then(data => {
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
        <View className='title'>当前积分：{params.credits || '-'}</View>
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
