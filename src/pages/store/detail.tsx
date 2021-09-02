import defaultImg from '@image/default.png'
import {useRouter} from '@tarojs/taro'
import { useState } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

export default function StoreDetail() {
  const history = useRouter()
  const [pageType] = useState(history.params.type)

  return (
    <View className='page-store'>
      <Image className='bg-img' src={defaultImg} mode='widthFix' />
      {pageType === 'person' && <View>
        <View className='desc-card card-layout'>
          <Image className='left' src={defaultImg} />
          <View className='right'>
            <View className='sub-title'>793母婴理疗师</View>
          </View>
        </View>
        <View className='detail-content'>资深技师，10年推拿经验，高级产后恢复师资深技师，10年推拿经验，高级产后恢复师资深技师，10年推拿经验，高级产后恢复师资深技师，10年推拿经验，高级产后恢复师资深技师，10年推拿经验，高级产后恢复师资深技师，10年推拿经验，高级产后恢复师</View>
      </View>}
      {pageType === 'project' && <View>
        <View className='desc-card card-layout'>
          <Image className='left' src={defaultImg} />
          <View className='flex-column'>
            <View className='sub-title'>经典足道</View>
            <View>￥158 / 60分钟</View>
          </View>
        </View>
        <View className='detail-content'>揉、刮、搓三大特色手法</View>
      </View>}
    </View>
  )
}