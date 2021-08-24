import { View } from '@tarojs/components'
import './index.scss'

interface Iprops {
  visible?: boolean,
  title?: string,
  maskClick?: true, // 点击遮罩是否可以关闭
  onClose?: () => void
  onBack?: () => void
  children?: JSX.Element | string
}
export default function CustomPop(props: Iprops) {
  let { visible=false, title='', maskClick=false } = props

  const closeFn = () => {
    props.onClose && props.onClose()
  }

  const onBack = () => {
    props.onBack && props.onBack()
  }

  const maskClickFn = () => {
    if (maskClick) {
      closeFn()
    }
  }
  return (
    <View>
      {visible && <View onClick={maskClickFn} className='pop-mask'></View>}
      {
        visible && <View className='custom-pop-wrap'>
          <View className='header'>
            {props.onBack ? <View onClick={onBack} className='at-icon at-icon-chevron-left'></View> : <view> </view>}
            {title && <View className='title'>{title}</View>}
            <View className='at-icon at-icon-close' onClick={closeFn}></View>
          </View>
          <View className='pop-body'>{props.children}</View>
        </View>
      }
    </View>
  )
}
