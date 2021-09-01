import { View, Image } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import defaultImg from '@image/default.png'
import Reserve from './bookPanel'
import StoreIntroduce from './storeIntroduce'

import './index.scss'

export default function Home() {
  return (
    <View className='page-home'>
      <Image className='bg-img' src={defaultImg} mode='widthFix' />
      <Reserve className='form-wrap' />
      <StoreIntroduce />
      <CustomTabar active='home' />
    </View>
  )
}

