import Taro, {useRouter} from '@tarojs/taro'
import { useState, useEffect, useMemo } from 'react'
import http from '@http'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CustomAlert from '@src/components/customAlert'
import Reserve from '@src/pages/index/bookPanel'
import PhoneCall from '@src/components/phoneCall'
import {linkToLogin, queryNewBook} from "@src/utils/tools"
import { event, getGlobalData } from '@globalData'
import ProjectList from './projectList'
import PersonList from './personList'

import './index.scss'

const defaultImg = 'https://cdn.utoohappy.com/mini/default.png'
export default function Home() {
  const history = useRouter()
  const [showBookAlert, setShowBookAlert] = useState(false)
  const [curentList, setCurentList] = useState<'project' | 'person'>('project')
  const [shopInfo, setShopInfo] = useState({
    info: {} as any,
    pic: [],
    projectList: [],
    personList: [],
  })

  const [loading, setLoading] = useState(false) // loading

  useEffect(() => {
    queryShopInfo()
  }, [])

  const storeFirstPic = useMemo(() => {
    return shopInfo.pic.length ? shopInfo.pic[0].url  : defaultImg
  }, [shopInfo])

  const queryShopInfo = () => {
    http({
      method: 'get',
      url: '/api/shop/queryById',
      data: {
        shopId: history.params.shopId
      }
    }).then(data => {
      setShopInfo({
        info: data,
        pic: data.pic || [],
        projectList: data.shopProjects || [],
        personList: data.shopWorkers || [],
      })
    })
  }

  const linkToImg = function(id, picList) {
    Taro.navigateTo({
      url: `/pages/store/imageList?id=${id}&picList=${JSON.stringify(picList)}`
    })
  }

  const showBookContent = () => {
    if(linkToLogin('pages/index/index')) return // 处理token为空

    if(loading) {
      return
    }
    setLoading(true)
    queryNewBook().then((data:any) => {
      if(data.status === 'SUCCESS') {
        Taro.showToast({
          title: '已有其他预约',
          icon: 'none',
          mask: false,
        })
        return
      }
      setShowBookAlert(true)
    }).catch(() => {
      setLoading(false)
      setShowBookAlert(true)
    })
  }

  return (
    <View className='page-store'>
      <Image className='bg-img' src={storeFirstPic} mode='widthFix' />
      <View className='img-mask'></View>
      <View>
        <View className='desc-wrap desc-card'>
          <View className='title'>{shopInfo.info.name}</View>
          {!!shopInfo.pic.length && <View className='img-wrap'>
            {shopInfo.pic.map((item, idx) => <Image key={idx} className='img' onClick={() => linkToImg(idx, shopInfo.pic)} mode='heightFix' src={item.url} />)}
          </View>}
          <View className='detail-wrap'>
            <View className='left'>
              <View>联系电话：<PhoneCall phone={shopInfo.info.phoneNum} /></View>
              <View>营业时间：{shopInfo.info.busiHours}</View>
              <View>地址：{shopInfo.info.address}</View>
            </View>
            <AtButton className='right' type='primary' disabled={shopInfo.info.canBook === 0} onClick={showBookContent} loading={loading}>{shopInfo.info.canBook === 0 ? '未开放预约' : '预约'}</AtButton>
          </View>
        </View>
        {!!shopInfo.info.notice && <View className='notice'>公告: {shopInfo.info.notice}</View>}
        {(shopInfo.projectList.length>0 || shopInfo.personList.length>0) && <View className='p16'>
          <View className='custom-tab-wrap'>
            {shopInfo.projectList.length>0 && <View className={`tab ${curentList === 'project' ? 'active' : ''}`} onClick={() => setCurentList('project')}>项目</View>}
            {shopInfo.personList.length>0 && <View  className={`tab ${curentList === 'person' ? 'active' : ''}`} onClick={() => setCurentList('person')}>技师</View>}
          </View>
          {curentList === 'project' && <ProjectList list={shopInfo.projectList} storeFirstPic={storeFirstPic} />}
          {curentList === 'person' && <PersonList list={shopInfo.personList} storeFirstPic={storeFirstPic} />}
        </View>}
      </View>
      <CustomAlert visible={showBookAlert} onClose={() => setShowBookAlert(false)}>
        <Reserve className='form-wrap' store={shopInfo.info} />
      </CustomAlert>
    </View>
  )
}

