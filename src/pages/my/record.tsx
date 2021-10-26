import { View, ScrollView } from '@tarojs/components'
import { useEffect, useState, useRef } from 'react'
import http from '@http'
import dayjs from 'dayjs'
import NoData from '@src/components/noData'
import './record.scss'

export default function Record() {
  const [dataList, setDataList] = useState([])
  const [loading, setLoading] = useState(false)
  const pageObj = useRef({
    pageNo: 10,
    total: 0,
    hasMore: true
  })
  useEffect(() => {
    bookHistory(1)
  }, [])

  const bookHistory = (pageNo) => {
    setLoading(true)
    http({
      method: 'get',
      url: '/api/shop/bookHistory',
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
    bookHistory(pageObj.current.pageNo + 1)
  }

  return (
    <View>
      <ScrollView
        className='page-record'
        scrollY
        scrollWithAnimation
        lowerThreshold={50}
        onScrollToLower={onScrollToLower}
      >
        {
          dataList.map((item,idx) => item.bookType === 'SPECIAL'
            ?  <View key={idx} className='list-block'>
              <View className='top'>
                <View className='title orange'>定制预约</View>
                <View className='light'>{(item.status === 'SUCCESS' || item.status === 'EXPIRE') ? '预约成功' : '已取消'}</View>
              </View>
              <View>{item.shopName}·{item.projectName}·{item.workerName}·{item.bookData ? dayjs(item.bookData).format('YYYY/MM/DD')  : ''} {item.bookTime}</View>
              <View className='light time'>{item.createTime ? dayjs(item.createTime).format('YYYY/MM/DD HH:mm')  : '--'}</View>
            </View>
            : <View key={idx} className='list-block'>
              <View className='top'>
                <View className='title blue'>快速预约</View>
                <View className='light'>{(item.status === 'SUCCESS' || item.status === 'EXPIRE') ? '预约成功' : '已取消'}</View>
              </View>
              <View>{item.shopName}·{item.entryDate ? dayjs(item.entryDate).format('YYYY/MM/DD HH:mm')  : ''}</View>
              <View className='light time'>{item.createTime ? dayjs(item.createTime).format('YYYY/MM/DD HH:mm')  : '--'}</View>
            </View>
          )
        }
        {(pageObj.current.hasMore || dataList.length === 0) ? null : <View className='no-more'>没有更多了</View>}
      </ScrollView>
      {dataList.length === 0 && <NoData />}
    </View>
  )
}
