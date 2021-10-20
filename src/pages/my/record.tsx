import { View, ScrollView } from '@tarojs/components'
import { useEffect, useState } from 'react'
import http from '@http'
import dayjs from 'dayjs'
import NoData from '@src/components/noData'
import './record.scss'

export default function Record() {
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    bookHistory()
  }, [])

  const bookHistory = () => {
    http({
      method: 'get',
      url: '/api/shop/bookHistory',
      // data: {
      //   pageNo: 1,
      //   pageSize: 1
      // }
    }).then(data => {
      setDataList(data?.records || data || [])
    })
  }
  // TODO: 1 分页， 2 订单创建时间， 3 快速预约时间
  const onScrollToLower = () => {
    console.log('end')
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
        
      </ScrollView>
      {dataList.length === 0 && <NoData />}
    </View>
  )
}
