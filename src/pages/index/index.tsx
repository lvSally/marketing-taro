import { View, Image } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import Reserve from './bookPanel'
import StoreIntroduce from './storeIntroduce'

import './index.scss'

export default function Home() {
  return (
    <View className='page-home'>
      <Image className='bg-img' src='https://cdn.utoohappy.com/mini/home-bg1.jpg' mode='widthFix' />
      <Reserve className='form-wrap' />
      <StoreIntroduce />
      <CustomTabar active='home' />
    </View>
  )
}

