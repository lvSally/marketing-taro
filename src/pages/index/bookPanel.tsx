import { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import {queryNewBook} from '@src/utils/tools'
import { event } from '@globalData'
import BookNormal, {IStore} from './bookNormal'
import BookCustom from './bookCustom'
import BookSuccess from './bookSuccess'

import './index.scss'

interface Iprops {
  className?: string
  store?: IStore
  shopName?: string
}

export default function BookPanel(props: Iprops) {
  const {className} = props
  const [activeTab, setActiveTab] = useState<'normal' | 'custom'>('normal') 
  const [bookData, setBookData] = useState<any>({}) // 预约数据
  const [loading, setLoading] = useState(false) // loading
  useEffect(() => {
    setLoading(true)
    queryNewBook().then(() => {
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
    event.listen('bookData', data => {
      setBookData(data || {})
    })
  }, [])

  return (
    <View className={`custom-reserve-form ${className || ''}`}>
      {loading && <Skeleton title row={6} rowHeight={50} />}
      {!loading && <View>
        {
          bookData.status === 'SUCCESS' ?
            <BookSuccess data={bookData} />
          :
            <View>
              <View className='tab-wrap'>
                <View onClick={() => setActiveTab('normal')} className={`tab ${activeTab === 'normal' ? 'active' : ''}`}>快速预约</View>
                <View onClick={() => setActiveTab('custom')} className={`tab ${activeTab === 'custom' ? 'active' : ''}`}>定制预约</View>
              </View>
              {activeTab === 'normal' && <BookNormal store={props.store} />}
              {activeTab === 'custom' && <BookCustom store={props.store} />}
            </View>
        }
      </View>}
    </View>
  )
}

