import { View, Image } from '@tarojs/components'
import './index.scss'

const successIcon = 'https://cdn.utoohappy.com/mini/success.png'
export default function BookSuccess() {
  
  return (
    <View className='custon-book-success'>
      <View className='title'><Image className='icon' src={successIcon} />预约成功</View>
      <View className='desc'>请准时前往，到店前台告知手机号即可如有疑问或需要取消预约，请致电对应门店咨询</View>
      <View className='content'>
        <View className='sub-title'>预约信息：</View>  
        <View>来一桶旗舰店·足疗·232理疗师·19:00-20:00</View>  
        <View className='sub-title'>门店信息：</View>  
        <View>联系电话：021-88888888</View>
        <View>营业时间：13:00-23:00</View>
        <View>地址：上海市浦东新区高行镇巨峰路111号路对面</View>
      </View>
    </View>
  )
}

