import defaultImg from '@image/default.png'
import defaultImg1 from '@image/default1.png'
import defaultImg2 from '@image/default2.png'
import defaultImg3 from '@image/default3.png'

import {useRouter} from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

export default function ImageList() {
  const history = useRouter()
  const [currentNum, setCurrentNum] = useState(Number(history.params.id))

  const changeFn = (e) => {
    setCurrentNum(e.detail.current)
  }

  return (
    <View className='page-store-image-list'>
      <Swiper
        className='swiper-content'
        circular
        onChange={changeFn}
        current={currentNum}
      >
        <SwiperItem>
          <Image src={defaultImg} mode='widthFix' />
        </SwiperItem>
        <SwiperItem>
          <Image src={defaultImg1} mode='widthFix' />
        </SwiperItem>
        <SwiperItem>
          <Image src={defaultImg2} mode='widthFix' />
        </SwiperItem>
        <SwiperItem>
          <Image src={defaultImg3} mode='widthFix' />
        </SwiperItem>
      </Swiper>
      <View className='number-content'><Text className='current'>{currentNum+1}</Text>/{4}</View>
    </View>
  )
}