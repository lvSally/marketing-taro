import { View } from '@tarojs/components'
// 编译冲突和pop引用同一份样式文件
import '../customPop/index.scss'

interface Iprops {
  visible?: boolean,
  maskClick?: true, // 点击遮罩是否可以关闭
  onClose?: () => void
  onBack?: () => void
  children?: JSX.Element | string
}
export default function CustomAlert(props: Iprops) {
  let { visible=false, maskClick=false } = props

  const closeFn = () => {
    props.onClose && props.onClose()
  }


  const maskClickFn = () => {
    if (maskClick) {
      closeFn()
    }
  }
  return (
    <View className='test'>
      {visible && <View onClick={maskClickFn} className='custom-alert-mask'></View>}
      {
        visible && <View className='custom-alert-wrap'>
          <View className='pop-body'>{props.children}</View>
          <View className='at-icon at-icon-close-circle' onClick={closeFn}></View>
        </View>
      }
    </View>
  )
}
