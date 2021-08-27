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
  maskClick?: boolean
}
export default function StoreListPop(props: Iprops) {
  const {list} = props
  const [select, setSelect] = useState<string | undefined>(undefined)

  useEffect(() => {
    setSelect(props.select)
  }, [props.select])

  const selectFn = (val) => {
    setSelect(val)
  }

  return <CustomPop title='选择门店' maskClick={props.maskClick} headBorder={false} OkBtnTxt={props.OkBtnTxt} visible={props.visible} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    <View className='custom-book-pop-wrap'>
      {
        list.map((item, idx) => <View className={`block-list ${select === item.id ? 'active' : ''}`} key={`${idx}-store`} onClick={() => selectFn(item.id)}>
          <Image className='left' src={defaultImg} />
          <View className='center'>
            <View className='sub-title'>来一桶旗舰店</View>
            <View>联系电话：021-88888888</View>
            <View>营业时间：13:00-23:00</View>
            <View>地址：上海市浦东新区高行镇巨峰路111号路对面</View>
          </View>
          <View className='right'><Image src={successIcon} /></View>
        </View>)
      }
      {list.length === 0 && <Nodata />}
    </View>
  </CustomPop>
}