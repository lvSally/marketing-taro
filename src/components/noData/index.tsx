import { View, Image } from '@tarojs/components'
import noData from '@image/no-data.png'
import './index.scss'

function NoData (){
  return <View className='custom-empty'>
    <Image src={noData} className='no-data' />
    <View className='no-data-text'>暂无数据</View>
  </View>
}

export default NoData
