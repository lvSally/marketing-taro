import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Nodata from '@src/components/noData'
import './index.scss'

interface Iprops {
  list: any[]
  storeFirstPic: string
}
const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
export default function ProjectList(props: Iprops) {
  let {list = [], storeFirstPic} = props
  const linkTo = function(obj) {
    Taro.navigateTo({
      url: `/pages/store/detail?type=project&obj=${JSON.stringify(obj)}&storeFirstPic=${storeFirstPic}`
    })
  }

  return <View className='custom-introduce-content'>
    {
      list.map(item => <View key={item.projectId} className='block-list' onClick={() => linkTo(item)}>
      <Image className='left' src={item.pic || defaultImg} />
      <View className='flex-column'>
        <View className='sub-title2'>{item.name || '-'}</View>
        <View>{(item.desc || '').length > 30 ? `${item.desc.substring(0, 30)}...` : item.desc}</View>
        <View className='sub-title2'>￥{item.price} / {item.duration}分钟</View>
      </View>
    </View>)
    }
    {list.length === 0 && <Nodata className='custom-empty1' />}
  </View>
}