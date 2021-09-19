import {useRouter} from '@tarojs/taro'
import { useMemo } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

const defaultImg = 'https://cdn.utoohappy.com/mini/default.png'

export default function StoreDetail() {
  const history = useRouter()
  const paramData = useMemo(() => {
    console.log(history)
    return {
      pageType: history.params.type,
      info: JSON.parse(history.params.obj || '{}'),
      storeFirstPic: history.params.storeFirstPic
    }
  }, [history.params])

  return (
    <View className='page-store'>
      <Image className='bg-img' src={paramData.storeFirstPic} mode='aspectFit' />
      {paramData.pageType === 'project' && <View className='desc-card-wrap'>
        <View className='desc-card card-layout'>
          <Image className='left' src={paramData.info.pic || defaultImg} />
          <View className='flex-column'>
            <View className='sub-title'>{paramData.info.name}</View>
            <View>￥{paramData.info.price} / {paramData.info.duration}分钟</View>
          </View>
        </View>
        <View className='detail-content'>{paramData.info.desc}</View>
      </View>}
      {paramData.pageType === 'person' && <View className='desc-card-wrap'>
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