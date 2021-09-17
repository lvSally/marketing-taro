import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Nodata from '@src/components/noData'
import './index.scss'

interface Iprops {
  list: any[]
}
const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
export default function PersonList(props: Iprops) {
  let {list = []} = props
  const linkTo = function(obj) {
    Taro.navigateTo({
      url: `/pages/store/detail?type=person&obj=${JSON.stringify(obj)}`
    })
  }

  return <View className='custom-introduce-content'>
    {list.map(item => <View key={item.workerId} className='block-list flex-start' onClick={() => linkTo(item)}>
      <Image className='left' src={item.pic || defaultImg} />
      <View className='right'>
        <View className='sub-title'>{item.name}</View>
        <View>{item.desc}</View>
      </View>
    </View>)}
    {list.length === 0 && <Nodata className='custom-empty1' />}
  </View>
}