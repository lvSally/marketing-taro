import { View, Image } from '@tarojs/components'
import './index.scss'

const noData = 'https://cdn.utoohappy.com/mini/no-data1.png'
interface Iprops {
  className?: string
}
function NoData (props: Iprops){
  return <View className={props.className || 'custom-empty'}>
    <Image src={noData} className='no-data' />
    <View className='no-data-text'>暂无数据</View>
  </View>
}

export default NoData
