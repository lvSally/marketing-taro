import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Nodata from '@src/components/noData'
import './index.scss'

interface Iprops {
  list: any[]
  storeFirstPic: string
}
const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
export default function PersonList(props: Iprops) {
  let {list = [], storeFirstPic} = props
  const linkTo = function(obj) {
    Taro.navigateTo({
      url: `/pages/store/detail?type=person&obj=${JSON.stringify(obj)}&storeFirstPic=${storeFirstPic}`
    })
  }

  return <View className='custom-introduce-content'>
    {list.map(item => <View key={item.workerId} className='block-list flex-start' onClick={() => linkTo(item)}>
      <Image className='left' src={item.pic || defaultImg} />
      <View className='right'>
        <View className='sub-title'>{item.name || '-'}</View>
        <View>{(item.desc || '').length > 30 ? `${item.desc.substring(0, 30)}...` : item.desc}</View>
      </View>
    </View>)}
    {list.length === 0 && <Nodata className='custom-empty1' />}
  </View>
}