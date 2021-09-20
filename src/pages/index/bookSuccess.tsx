import { View, Image } from '@tarojs/components'
import dayjs from 'dayjs'
import PhoneCall from '@src/components/phoneCall'
import './index.scss'

const successIcon = 'https://cdn.utoohappy.com/mini/success.png'
interface Iprops {
  data: any
}
export default function BookSuccess(props:Iprops) {
  const {data={}} = props
  return (
    <View className='custon-book-success'>
      <View className='title'><Image className='icon' src={successIcon} />预约成功</View>
      <View className='desc'>
        <View>请准时前往，到店前台告知手机号即可</View>
        <View>如有疑问或需要取消预约，请致电对应门店咨询</View>
      </View>
      <View className='content'>
        <View className='sub-title'>预约信息：</View>
        {
          data.bookType === 'FAST'
            ? <View>{data.shopName}·{data.entryDate ? dayjs(data.entryDate).format('YYYY/MM/DD HH:mm')  : ''}</View>
            : <View>{data.shopName}·{data.projectName}·{data.workerName}·{data.bookData ? dayjs(data.bookData).format('YYYY/MM/DD')  : ''} {data.bookTime}</View>
        }
        <View className='sub-title'>门店信息：</View>  
        <View>联系电话：<PhoneCall phone={data.phone} /></View>
        <View>营业时间：{data.busiHours || '-'}</View>
        <View>地址：{data.address || '-'}</View>
      </View>
    </View>
  )
}

