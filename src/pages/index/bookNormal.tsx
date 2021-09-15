import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import http from '@http'
import StoreListPop from './storeListPop'
import TimeListPop, {selectTimeType} from './TimeListPop'


import './index.scss'

export interface IStore {
  shopId: string,
  name: string,
  address?: string,
  pic: any[],
  phoneNum?: string
  busiHours?: string
}

export default function BookNormal() {
  const [store, setStore] = useState<IStore | undefined>(undefined)
  const [time, setTime] = useState<selectTimeType>()
  const [showStore, setShowStore] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [storeList, setStoreList] = useState([])

  useEffect(() => {
    queryShopList()
  }, [])

  // 监听store变化时清空time中的内容
  useEffect(() => {
    setTime(undefined)
  }, [store])

  const queryShopList = () => {
    http({
      method: 'get',
      url: '/admin/shop/list',
      data: {}
    }).then(data => {
      setStoreList(data.records || [])
    })
  }

  const showTimeFn = () => {
    if(!store) {
      Taro.showToast({
        title: '请先选择门店',
        icon: 'none',
        mask: false,
      })
      return
    }
    setShowTime(true)
  }

  const storeCloseFn = (val) => {
    storeList.forEach(item => {
      if(item.shopId === val) {
        setStore(item)
      }
    })
    
    setShowStore(false)
  }

  const timeCloseFn = (val) => {
    setTime(val)
    setShowTime(false)
  }

  const bookBtn = () => {
    let entryDate = -1
    if(time.type === 'todayList') {
      entryDate = dayjs().startOf('d').valueOf() // 当天凌晨的时间戳
    } else {
      entryDate = dayjs(+new Date + 86400000).startOf('d').valueOf() // 次日凌晨的时间戳
    }
    entryDate += hourToMillisecond(time.time)

    // {type: "todayList", time: "05:00"}
    dayjs().startOf('d').valueOf()
    http({
      method: 'post',
      url: '/api/shop/book',
      data: {
        bookType: 'FAST',
        shopId: store.shopId,
        entryDate,
      }
    }).then(() => {
      // todo: 更新订单信息
    })
  }

  const hourToMillisecond = (timeStr) => {
    const timeArr = timeStr.split(':')
    if(timeArr.length !== 2) return 0
    let hour = +timeArr[0]
    if(+timeArr[1] === 30) {
      hour += 0.5
    }
    return hour*3600*1000
  }
  
  return (
    <View className='custom-book-normal'>
      <View className='normal-list mb40'>
        <View>预约门店:</View>
        <View className={`${store ? '' : 'empty'} content`} onClick={() => setShowStore(true)}>{store?.name || '请选择'}</View>
      </View>
      <View className='normal-list'>
        <View>到店时间:</View>
        <View className={`${time?.time ? '' : 'empty'} content`} onClick={showTimeFn}>{time?.type === 'tomorrowList' ? '明天 ' : ''}{time?.time || '请选择'}</View>
      </View>
      <AtButton className='book-btn' type='primary' circle onClick={bookBtn}>预约</AtButton>

      <StoreListPop visible={showStore} list={storeList} maskClick onClose={storeCloseFn} onOk={storeCloseFn} select={store?.shopId} />
      {!!store && <TimeListPop visible={showTime} select={time} timeStart={(store.busiHours || '').split('-')[0]} timeEnd={(store.busiHours || '').split('-')[1]} onClose={timeCloseFn} onOk={timeCloseFn} />}
    </View>
  )
}

