import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import http from '@http'
import forceUpdateFn from '@src/hook/forceUpdate'
import {linkToLogin, queryNewBook} from "@src/utils/tools"
import StoreListPop from './storeListPop'
import TimeListPop from './TimeListPop'


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
  const [time, setTime] = useState()
  const [showStore, setShowStore] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [storeList, setStoreList] = useState([])
  const [loading, setLoading] = useState(false)

  const forceUpdate = forceUpdateFn()

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
      url: '/api/shop/list',
      data: {
        pageNo: 1,
        pageSize: 100,
      }
    }).then(data => {
      setStoreList(data.records || [])
    })
  }

  const showTimeFn = () => {
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
    if(linkToLogin('pages/index/index')) return // 处理token为空
    if(props.store) return // 如果由店铺进入禁用门店选择
    setShowStore(true)
  }

  const storeCloseFn = (val, type: 'ok' | 'close') => {
    if(!val && type === 'ok') {
      Taro.showToast({
        title: '请先选择门店',
        icon: 'none',
        mask: false,
      })
      return
    }
    
    storeList.forEach(item => {
      if(item.shopId === val) {
        setStore(item)
      }
    })
    
    setShowStore(false)
    if(type === 'ok') {
      setShowTime(true)
    }
  }

  const timeCloseFn = (val) => {
    setTime(val)
    setShowTime(false)
  }

  const timePopBack = () => {
    setShowTime(false)
    setShowStore(true)
  }

  const bookBtn = (selectTime?) => {
    if(linkToLogin('pages/index/index')) return // 处理token为空

    const currentTime = selectTime || time
    if(selectTime) {
      setTime(selectTime)
    }
    if(!store) {
      Taro.showToast({
        title: '请先选择门店',
        icon: 'none',
        mask: false,
      })
      return
    }

    if(!currentTime) {
      Taro.showToast({
        title: '请选择时间',
        icon: 'none',
        mask: false,
      })
      return
    }
    if(currentTime < +new Date()) {
      forceUpdate()
      Taro.showToast({
        title: '该时间不可预约',
        icon: 'none',
        mask: false,
      })
      return
    }

    if(loading) {
      return
    }
    setLoading(true)

    http({
      method: 'post',
      url: '/api/shop/book',
      data: {
        bookType: 'FAST',
        shopId: store.shopId,
        shopName: store.name,
        entryDate: currentTime,
      }
    }).then(() => {
      queryNewBook()
      if(selectTime) {
        setShowTime(false)
      }
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
        <View className={`${time ? '' : 'empty'} content`} onClick={showTimeFn}>{(time && (time > dayjs().startOf('d').valueOf() + 86400000)) ? '明天 ' : ''}{(time && dayjs(time).format('HH:mm')) || '请选择'}</View>
      </View>
      <AtButton className='book-btn' type='primary' circle onClick={() => bookBtn()}>预约</AtButton>

      <StoreListPop visible={showStore} OkBtnTxt='确定，下一步' list={storeList} maskClick onClose={(val) => storeCloseFn(val, 'close')} onOk={(val) => storeCloseFn(val, 'ok')} select={store?.shopId} />
      {!!store && <TimeListPop visible={showTime} select={time} timeStart={(store.busiHours || '').split('-')[0]} timeEnd={(store.busiHours || '').split('-')[1]} onBack={timePopBack} onClose={timeCloseFn} onOk={(val) => bookBtn(val)} />}
    </View>
  )
}

