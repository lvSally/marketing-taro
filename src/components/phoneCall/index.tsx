import { Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface Iprops {
  phone?: string
  replace?: string
}
function NoData (props: Iprops){
  const {replace = '-'} = props
  const makePhoneCall = (e, phoneNumber) => {
    e.stopPropagation()
    if(!phoneNumber) {
      return
    }
    Taro.makePhoneCall({
      phoneNumber
    })
  }
  return <Text className='custom-phone' onClick={(e) => makePhoneCall(e, props.phone)}>{props.phone || replace}</Text>
}

export default NoData
