import { useEffect, useState, useRef } from 'react'
import { View, ScrollView } from '@tarojs/components'
import dayjs from 'dayjs'
import http from '@http'
import NoData from '@src/components/noData'
import { useRouter } from '@tarojs/taro'

import './grade.scss'

export default function Grade() {
  const [dataList, setDataList] = useState([])
  const params = useRouter().params
  const [loading, setLoading] = useState(false)
  const pageObj = useRef({
    pageNo: 10,
    total: 0,
    hasMore: true
  })
  useEffect(() => {
    queryCreditsTrans(1)
  }, [])

  const queryCreditsTrans = (pageNo) => {
    setLoading(true)
    http({
      method: 'get',
      url: '/api/credits/queryCreditsTrans',
      data: {
        pageSize: 10,
        pageNo
      }
    }).then(data => {
      const currentList = dataList.concat(data.records || [])
      pageObj.current = {
        pageNo: data.current,
        total: data.total,
        hasMore: data.total < currentList.length
      }
      setDataList(currentList)
    }).finally(() => {
      setLoading(false)
    })
  }
  
  const onScrollToLower = () => {
    if(loading || !pageObj.current.hasMore) {
      return
    }
    queryCreditsTrans(pageObj.current.pageNo + 1)
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

        {(pageObj.current.hasMore || dataList.length === 0) ? null : <View className='no-more'>没有更多了</View>}
      </ScrollView>
      {dataList.length === 0 && <NoData />}
    </View>
  )
}
