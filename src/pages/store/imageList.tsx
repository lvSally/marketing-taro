import {useRouter} from '@tarojs/taro'
import { useEffect, useState, useMemo } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

export default function ImageList() {
  const {id, picList} = useRouter().params

  const [currentNum, setCurrentNum] = useState(Number(id))
  const imgList = useMemo(() => {
    return JSON.parse(picList || '[]')
  }, [picList])

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
        {
          imgList.map((item, idx) => <SwiperItem key={idx}>
            <Image src={item.url} mode='widthFix' />
          </SwiperItem>)
        }
      </Swiper>
      <View className='number-content'><Text className='current'>{currentNum+1}</Text>/{imgList.length}</View>
    </View>
  )
}