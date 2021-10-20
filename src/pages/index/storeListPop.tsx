import { useState, useEffect } from 'react'
import http from '@http'
import { View, Image } from '@tarojs/components'
import CustomPop from '@src/components/customPop'
import Nodata from '@src/components/noData'

const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
const successIcon = 'https://cdn.utoohappy.com/mini/success.png'
interface Iprops {
  visible?: boolean
  onClose?: (id, list) => void
  onOk?: (id, list) => void
  select?: string | undefined
  OkBtnTxt?: string
  maskClick?: boolean
  btnLoading?:boolean
}
export default function StoreListPop(props: Iprops) {
  const [select, setSelect] = useState<string | undefined>(undefined)
  const [list, setList] = useState([])

  useEffect(() => {
    queryShopList()
  }, [])

  useEffect(() => {
    setSelect(props.select)
  }, [props.select])

  const selectFn = (val) => {
    setSelect(val)
  }

  const queryShopList = () => {
    http({
      method: 'get',
      url: '/api/shop/list',
      data: {
        pageNo: 1,
        pageSize: 100,
      }
    }).then(data => {
      setList((data.records || []).filter(item => item.canBook === 1))
    })
  }

  return <CustomPop btnLoading={props.btnLoading} title='选择门店' maskClick={props.maskClick} headBorder={false} OkBtnTxt={props.OkBtnTxt} visible onClose={() => props.onClose && props.onClose(select, list)} onOk={() => props.onOk && props.onOk(select, list)}>
    <View className='custom-book-pop-wrap'>
      {
        list.map((item, idx) => <View className={`block-list ${select === item.shopId ? 'active' : ''}`} key={`${idx}-store`} onClick={() => selectFn(item.shopId)}>
          <Image className='left' src={item.pic?.length ? item.pic[0].url : defaultImg} />
          <View className='center'>
            <View className='sub-title'>{item.name}</View>
            <View>联系电话：{item.phoneNum}</View>
            <View>营业时间：{item.busiHours}</View>
            <View>地址：{item.address}</View>
          </View>
          <View className='right'><Image src={successIcon} /></View>
        </View>)
      }
      {list.length === 0 && <Nodata />}
    </View>
  </CustomPop>
}