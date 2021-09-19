import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import http from '@http'
import {hourToMillisecond, linkToLogin, notOpenDate, queryNewBook} from "@src/utils/tools"
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
interface Iprops {
  className?: string
  store?: IStore
}
export default function BookNormal(props:Iprops) {
  const [store, setStore] = useState<IStore | undefined>(props.store)
  const [time, setTime] = useState<selectTimeType>()
  const [showStore, setShowStore] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [storeList, setStoreList] = useState([])
  const [loading, setLoading] = useState(false)

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
    if(notOpenDate()) return // 校验是否到开放时间
    if(linkToLogin('pages/index/index')) return // 处理token为空
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

  const showStoreFn = () => {
    if(notOpenDate()) return // 校验是否到开放时间
    if(linkToLogin('pages/index/index')) return // 处理token为空
    if(props.store) return // 如果由店铺进入禁用门店选择
    setShowStore(true)
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
    if(notOpenDate()) return // 校验是否到开放时间
    if(linkToLogin('pages/index/index')) return // 处理token为空

    if(!store || !time) {
      Taro.showToast({
        title: '门店和到店时间不能为空',
        icon: 'none',
        mask: false,
      })
      return
    }
    if(loading) {
      return
    }
    setLoading(true)
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
      queryNewBook()
    }).finally(() => {
      setLoading(false)
    })
  }
  
  return (
    <View className='custom-book-normal'>
      <View className='normal-list mb40'>
        <View>预约门店:</View>
        <View className={`${store ? '' : 'empty'} content`} onClick={showStoreFn}>{store?.name || '请选择'}</View>
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

