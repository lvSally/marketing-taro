import { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import CustomPop from '@src/components/customPop'
import Nodata from '@src/components/noData'
import defaultImg from '@image/default1.png'
import successIcon from '@image/success.png'
import type {IStore} from './bookNormal'

interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  list: IStore[]
  select?: string | undefined
  OkBtnTxt?: string
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

  return <CustomPop title='选择项目' headBorder={false} OkBtnTxt='确定，下一步' visible={props.visible} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    <View className='custom-book-pop-wrap'>
      {
        list.map((item, idx) => <View className={`block-list ${select === item.id ? 'active' : ''}`} key={`${idx}-store`} onClick={() => selectFn(item.id)}>
          <Image className='left' src={defaultImg} />
          <View className='center direction-column'>
            <View>
              <View className='sub-title'>经典足道</View>
              <View>揉、刮、搓三大特色手法</View>
            </View>
            <View>￥158 / 60分钟</View>
          </View>
          <View className='right'><Image src={successIcon} /></View>
        </View>)
      }
      {list.length === 0 && <Nodata />}
    </View>
  </CustomPop>
}