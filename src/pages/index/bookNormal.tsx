import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import StoreListPop from './storeListPop'
// import ProjectListPop from './projectListPop'
import TimeListPop from './TimeListPop'


import './index.scss'

export interface IStore {
  id: string,
  name: string,
  address?: string
}

export default function BookNormal() {
  const [store, setStore] = useState<IStore | undefined>(undefined)
  const [time, setTime] = useState('')
  const [showStore, setShowStore] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [storeList, setStoreList] = useState([
    {id: '001', name: '店面1', address: '地址1'},
    {id: '002', name: '店面2', address: '地址2'},
    {id: '003', name: '店面3', address: '地址3'},
  ])

  // 监听store变化时清空time中的内容
  useEffect(() => {
    setTime('')
  }, [store])

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
      if(item.id === val) {
        setStore(item)
      }
    })
    
    setShowStore(false)
  }

  const bookBtn = () => {
    console.log(store, time)
  }
  
  return (
    <View className='book-normal'>
      <View className='normal-list mb40'>
        <View>预约门店:</View>
        <View className={`${store ? '' : 'empty'} content`} onClick={() => setShowStore(true)}>{store?.name || '请选择'}</View>
      </View>
      <View className='normal-list'>
        <View>到店时间:</View>
        <View className={`${time ? '' : 'empty'} content`} onClick={showTimeFn}>{time || '请选择'}</View>
      </View>
      <AtButton className='book-btn' type='primary' circle onClick={bookBtn}>预约</AtButton>

      <StoreListPop visible={showStore} list={storeList} maskClick onClose={storeCloseFn} onOk={storeCloseFn} select={store?.id} />
      {/* <ProjectListPop visible list={storeList} onClose={storeCloseFn} onOk={storeCloseFn} select={store?.id} /> */}
      <TimeListPop visible={showTime} timeStart='22:00' timeEnd='次日01:00' />
    </View>
  )
}

