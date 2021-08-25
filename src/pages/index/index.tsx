import { View, Image } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import defaultImg from '@image/default.png'
import Reserve from './bookPanel'

import './index.scss'

export default function Home() {
  return (
    <View className='page-home'>
      <View className='bg-wrap'>
        <Image className='bg-img' src={defaultImg} mode='widthFix' />
      </View>
      <Reserve className='form-wrap' />
      <CustomTabar active='home' />
    </View>
  )
}

