import { useState } from 'react'
import { View } from '@tarojs/components'
import BookNormal from './bookNormal'
import BookCustom from './bookCustom'
import BookSuccess from './bookSuccess'

import './index.scss'

interface Iprops {
  className?: string
}

export default function BookPanel(props: Iprops) {
  const {className} = props
  const [activeTab, setActiveTab] = useState<'normal' | 'custom'>('normal') 
  const [isBook, setIsBook] = useState(false) // 是否预约
  return (
    <View className={`custom-reserve-form  ${className || ''}`}>
      {
        isBook ?
          <BookSuccess />
        :
          <View>
            <View className='tab-wrap'>
              <View onClick={() => setActiveTab('normal')} className={`tab ${activeTab === 'normal' ? 'active' : ''}`}>快速预约</View>
              <View onClick={() => setActiveTab('custom')} className={`tab ${activeTab === 'custom' ? 'active' : ''}`}>定制预约</View>
            </View>
            {activeTab === 'normal' && <BookNormal />}
            {activeTab === 'custom' && <BookCustom />}
          </View>
      }
    </View>
  )
}

