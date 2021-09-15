import defaultImg from '@image/default.png'
import {useRouter} from '@tarojs/taro'
import { useMemo } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

export default function StoreDetail() {
  const history = useRouter()
  const paramData = useMemo(() => {
    return {
      pageType: history.params.type,
      info: JSON.parse(history.params.obj || '{}'),
    }
  }, [history.params])

  return (
    <View className='page-store'>
      <Image className='bg-img' src={defaultImg} mode='widthFix' />
      {paramData.pageType === 'project' && <View>
        <View className='desc-card card-layout'>
          <Image className='left' src={paramData.info.pic || defaultImg} />
          <View className='flex-column'>
            <View className='sub-title'>{paramData.info.name}</View>
            <View>￥{paramData.info.price} / {paramData.info.duration}分钟</View>
          </View>
        </View>
        <View className='detail-content'>{paramData.info.desc}</View>
      </View>}
      {paramData.pageType === 'person' && <View>
        <View className='desc-card card-layout'>
          <Image className='left' src={paramData.info.pic || defaultImg} />
          <View className='right'>
            <View className='sub-title'>{paramData.info.name}</View>
          </View>
        </View>
        <View className='detail-content'>{paramData.info.desc}</View>
      </View>}
    </View>
  )
}