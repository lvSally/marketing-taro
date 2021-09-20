import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PhoneCall from '@src/components/phoneCall'
import http from '@http'
import './index.scss'

const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
export default function StoreIntroduce() {
  const [dataList, setDatalist] = useState([])
  useEffect(() => {
    queryShopList()
  }, [])

  const linkTo = function(id) {
    Taro.navigateTo({
      url: `/pages/store/index?shopId=${id}`
    })
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
      setDatalist(data.records || [])
    })
  }

  return <View className='custom-introduce-content'>
    <View className='title'>门店介绍</View>
    {
      dataList.map(item => <View key={item.shopId} className='block-list' onClick={() => linkTo(item.shopId)}>
        <Image className='left' src={item.pic?.length ? item.pic[0].url :  defaultImg} />
        <View className='right'>
          <View className='sub-title'>{item.name}</View>
          <View>联系电话：<PhoneCall phone={item.phoneNum} /></View>
          <View>营业时间：{item.busiHours}</View>
          <View>地址：{item.address}</View>
        </View>
      </View>)
    }
    <View className='tip'>更多门店陆续开放中，敬请期待</View>
  </View>
}