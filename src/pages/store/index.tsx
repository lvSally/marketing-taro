import Taro, {useRouter} from '@tarojs/taro'
import { useState, useEffect } from 'react'
import http from '@http'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CustomAlert from '@src/components/customAlert'
import Reserve from '@src/pages/index/bookPanel'
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

  useEffect(() => {
    queryShopInfo()
  }, [])

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

  return (
    <View className='page-store'>
      <Image className='bg-img' src={shopInfo.pic.length ? shopInfo.pic[0].url  : defaultImg} mode='widthFix' />
      <View className='desc-wrap desc-card'>
        <View className='title'>{shopInfo.info.name}</View>
        {!!shopInfo.pic.length && <View className='img-wrap'>
          {shopInfo.pic.map((item, idx) => <Image key={idx} className='img' onClick={() => linkToImg(idx, shopInfo.pic)} mode='heightFix' src={item.url} />)}
        </View>}
        <View className='detail-wrap'>
          <View className='left'>
            <View>联系电话：{shopInfo.info.phoneNum}</View>
            <View>营业时间：{shopInfo.info.busiHours}</View>
            <View>地址：{shopInfo.info.address}</View>
          </View>
          <AtButton className='right' type='primary' onClick={() => setShowBookAlert(true)}>预约</AtButton>
        </View>
      </View>
      <View className='p16'>
        <View className='custom-tab-wrap'>
          <View className={`tab ${curentList === 'project' ? 'active' : ''}`} onClick={() => setCurentList('project')}>项目</View>
          <View  className={`tab ${curentList === 'person' ? 'active' : ''}`} onClick={() => setCurentList('person')}>技师</View>
        </View>
        {curentList === 'project' && <ProjectList list={shopInfo.projectList} />}
        {curentList === 'person' && <PersonList list={shopInfo.personList} />}
      </View>
      <CustomAlert visible={showBookAlert} onClose={() => setShowBookAlert(false)}>
        <Reserve className='form-wrap' />
      </CustomAlert>
    </View>
  )
}

