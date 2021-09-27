import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getGlobalData } from '@globalData'
import './index.scss'

type activeType = 'home' | 'discount' | 'my'
interface Iprops {
  active: activeType
  className?: string
}

const homeIcon = 'https://cdn.utoohappy.com/mini/home.png'
const myIcon = 'https://cdn.utoohappy.com/mini/my.png'
const discountIcon = 'https://cdn.utoohappy.com/mini/discount.png'
const homeActiveIcon = 'https://cdn.utoohappy.com/mini/active-home.png'
const myActiveIcon = 'https://cdn.utoohappy.com/mini/active-my.png'
const discountActiveIcon = 'https://cdn.utoohappy.com/mini/active-discount.png'
export default function CustomTabar(props: Iprops) {
  let {active, className} = props

  const navbarFn = (type: activeType) => {
    if (type === active) {
      return
    }

    let url = ''
    switch (type) {
      case 'home':
        url = '/pages/index/index'
        break
      case 'discount':
        url = '/pages/discount/index'
        break
      case 'my':
        url = '/pages/my/index'
        break
    }
    Taro.redirectTo({ url })
  }


  return (
    <View className={`customTabar-wrapper ${getGlobalData('isIPX') ? 'bottom-IPX' : ''} ${className || ''}`}>
      <View className={`navbar-block ${active === 'home' ? 'active' : ''}`} onClick={() => navbarFn('home')}>
        <Image className='tab-img' src={active === 'home' ? homeActiveIcon : homeIcon} />
        <View className='font'>首页</View>
      </View>
      <View className={`navbar-block ${active === 'discount' ? 'active' : ''}`} onClick={() => navbarFn('discount')}>
        <Image className='tab-img' src={active === 'discount' ? discountActiveIcon : discountIcon} />
        <View className='font'>优惠</View>
      </View>
      <View className={`navbar-block ${active === 'my' ? 'active' : ''}`} onClick={() => navbarFn('my')}>
        <Image className='tab-img' src={active === 'my' ? myActiveIcon : myIcon} />
        <View className='font'>我的</View>
      </View>
    </View>
  )
}
