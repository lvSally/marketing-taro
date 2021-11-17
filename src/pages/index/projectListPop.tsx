import { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import CustomPop from '@src/components/customPop'
import Nodata from '@src/components/noData'

const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
const successIcon = 'https://cdn.utoohappy.com/mini/success.png'
interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  onBack?: () => void
  list: any[]
  select?: string | undefined
  OkBtnTxt?: string
  btnLoading?:boolean
}
export default function ProjectListPop(props: Iprops) {
  const {list} = props
  const [select, setSelect] = useState<string | undefined>(undefined)

  useEffect(() => {
    setSelect(props.select)
  }, [props.select])

  const selectFn = (val) => {
    setSelect(val)
  }

  return <CustomPop title='选择项目' btnLoading={props.btnLoading} onBack={props.onBack} headBorder={false} OkBtnTxt={props.OkBtnTxt} visible onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    <View className='custom-book-pop-wrap'>
      {
        list.map((item, idx) => <View className={`block-list ${select === item.projectId ? 'active' : ''}`} key={`${idx}-store`} onClick={() => selectFn(item.projectId)}>
          <Image className='left' src={item.pic || defaultImg} />
          <View className='center direction-column'>
            <View>
              <View className='sub-title'>{item.name}</View>
              <View>{(item.desc || '').length > 30 ? `${item.desc.substring(0, 30)}...` : item.desc}</View>
            </View>
            <View className='sub-title'>￥{item.price} / {item.duration}分钟</View>
          </View>
          <View className='right'><Image src={successIcon} /></View>
        </View>)
      }
      {list.length === 0 && <Nodata />}
    </View>
  </CustomPop>
}