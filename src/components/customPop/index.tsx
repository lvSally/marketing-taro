import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

interface Iprops {
  visible?: boolean,
  title?: string,
  maskClick?: boolean, // 点击遮罩是否可以关闭
  onClose?: () => void
  onOk?: () => void
  onBack?: () => void
  children?: JSX.Element | string
  headBorder?: boolean
  showOkBtn?: boolean
  OkBtnTxt?: string
}
export default function CustomPop(props: Iprops) {
  let { visible=false, title='', maskClick=false, headBorder=true, showOkBtn=true, OkBtnTxt='确定' } = props

  const closeFn = () => {
    props.onClose && props.onClose()
  }
  const okFn = () => {
    props.onOk && props.onOk()
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
      {visible && <View onClick={maskClickFn} className='custom-pop-mask'></View>}
      {
        visible && <View className='custom-pop-wrap'>
          <View className={`${headBorder ? 'border' : ''} header`}>
            {props.onBack ? <View onClick={onBack} className='at-icon at-icon-chevron-left'></View> : <view> </view>}
            {title && <View className='title'>{title}</View>}
            <View className='at-icon at-icon-close' onClick={closeFn}></View>
          </View>
          <View className='pop-body'>{props.children}</View>
          {showOkBtn && <View className='footer-content'>
            <AtButton type='primary' circle onClick={okFn}>{OkBtnTxt}</AtButton>
          </View>}
        </View>
      }
    </View>
  )
}
