import {useRouter} from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

const defaultImg = 'https://cdn.utoohappy.com/mini/default.png'
const defaultImg1 = 'https://cdn.utoohappy.com/mini/default1.png'
const defaultImg2 = 'https://cdn.utoohappy.com/mini/default2.png'
const defaultImg3 = 'https://cdn.utoohappy.com/mini/default3.png'
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