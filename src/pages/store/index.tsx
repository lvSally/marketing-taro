import defaultImg1 from '@image/default1.png'
import defaultImg from '@image/default.png'
import { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CustomAlert from '@src/components/customAlert'
import Reserve from '@src/pages/index/bookPanel'
import ProjectList from './projectList'
import PersonList from './personList'

import './index.scss'

export default function Home() {
  const [showBookAlert, setShowBookAlert] = useState(false)
  const [curentList, setCurentList] = useState<'project' | 'person'>('project')
  return (
    <View className='page-store'>
      <View className='bg-wrap'>
        <Image className='bg-img' src={defaultImg} mode='widthFix' />
      </View>
      <View className='desc-wrap'>
        <View className='title'>来一桶足浴旗舰店</View>
        <View className='img-wrap'>
          <Image className='img' mode='heightFix' src={defaultImg1} />
          <Image className='img' mode='heightFix' src={defaultImg1} />
          <Image className='img' mode='heightFix' src={defaultImg1} />
        </View>
        <View className='detail-wrap'>
          <View className='left'>
            <View>联系电话：021-88888888</View>
            <View>营业时间：13:00-23:00</View>
            <View>地址：上海市浦东新区高行镇巨峰路111号路对面</View>
          </View>
          <AtButton className='right' type='primary' onClick={() => setShowBookAlert(true)}>预约</AtButton>
        </View>
      </View>
      <View className='p16'>
        <View className='custom-tab-wrap'>
          <View className={`tab ${curentList === 'project' ? 'active' : ''}`} onClick={() => setCurentList('project')}>项目</View>
          <View  className={`tab ${curentList === 'person' ? 'active' : ''}`} onClick={() => setCurentList('person')}>技师</View>
        </View>
        {curentList === 'project' && <ProjectList />}
        {curentList === 'person' && <PersonList />}
      </View>
      <CustomAlert visible={showBookAlert} onClose={() => setShowBookAlert(false)}>
        <Reserve className='form-wrap' />
      </CustomAlert>
    </View>
  )
}

