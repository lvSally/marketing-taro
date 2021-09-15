import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import defaultImg from '@image/default1.png'
import './index.scss'

interface Iprops {
  list: any[]
}
export default function ProjectList(props: Iprops) {
  let {list = []} = props
  const linkTo = function(obj) {
    Taro.navigateTo({
      url: `/pages/store/detail?type=project&obj=${JSON.stringify(obj)}`
    })
  }

  return <View className='custom-introduce-content'>
    {
      list.map(item => <View key={item.projectId} className='block-list' onClick={() => linkTo(item)}>
      <Image className='left' src={item.pic || defaultImg} />
      <View className='flex-column'>
        <View>
          <View>{item.name}</View>
          <View>{item.desc}</View>
        </View>
        <View>￥{item.price} / {item.duration}分钟</View>
      </View>
    </View>)
    }
  </View>
}