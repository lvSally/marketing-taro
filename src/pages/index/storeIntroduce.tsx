import { View, Image } from '@tarojs/components'
import defaultImg from '@image/default1.png'
import './index.scss'

export default function StoreIntroduce() {
  return <View className='introduce-content'>
    <View className='title'>门店介绍</View>
    <View className='block-list'>
      <Image className='left' src={defaultImg} />
      <View className='right'>
        <View className='sub-title'>来一桶旗舰店</View>
        <View>联系电话：021-88888888</View>
        <View>营业时间：13:00-23:00</View>
        <View>地址：上海市浦东新区高行镇巨峰路111号路对面</View>
      </View>
    </View>
    <View className='block-list'>
      <Image className='left' src={defaultImg} />
      <View className='right'>
        <View className='sub-title'>来一桶旗舰店</View>
        <View>联系电话：021-88888888</View>
        <View>营业时间：13:00-23:00</View>
        <View>地址：上海市浦东新区高行镇巨峰路111号路对面</View>
      </View>
    </View>
    <View className='block-list'>
      <Image className='left' src={defaultImg} />
      <View className='right'>
        <View className='sub-title'>来一桶旗舰店</View>
        <View>联系电话：021-88888888</View>
        <View>营业时间：13:00-23:00</View>
        <View>地址：上海市浦东新区高行镇巨峰路111号路对面</View>
      </View>
    </View>
    <View className='tip'>更多门店陆续开放中，敬请期待</View>
  </View>
}