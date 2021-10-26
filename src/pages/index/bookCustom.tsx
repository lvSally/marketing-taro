import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { useState, useEffect, useMemo } from 'react'
import http from '@http'
import {linkToLogin, queryNewBook} from "@src/utils/tools"
import StoreListPop from './storeListPop'
import ProjectListPop from './projectListPop'
import PersonAndTimePop from './personAndTimePop'
import {IStore} from './bookNormal'

import './index.scss'

// type Istep = 'store' | 'project' | 'personAndTime'

interface Iprops {
  className?: string
  store?: IStore
}

export default function BookCustom(props:Iprops) {
  const [showPop, setShowPop] = useState({
    store: false,
    project: false,
    personAndTime: false,
  })
  const [selectStoreInfo, setSelectStoreInfo] = useState({
    shopProjects: [],
    shopWorkers: [],
    detail: {} as any
  })
  const [select, setSelect] = useState({
    shopId: props.store?.shopId,
    projectId: undefined,
    personAndTime: undefined,
    step: props.store ? 'personAndTime' : 'store'
  })
  const [loading, setLoading] = useState(false)
  const [loadingShopInfo, setLoadingShopInfo] = useState(false)
  const [storeList, setStoreList] = useState([])
  
  useEffect(() => {
    if(props.store) {
      queryShopInfo(props.store.shopId)
    }
  }, [])

  const queryShopInfo = (shopId) => {
    http({
      method: 'get',
      url: '/api/shop/queryById',
      data: {
        shopId
      }
    }).then(data => {
      setSelectStoreInfo({
        shopProjects: [],
        shopWorkers: (data.shopWorkers || []).filter(item => item.canBook === 1),
        detail: data
      })
    })
  }

  const startBtnFn = () => {
    if(linkToLogin('pages/index/index')) return // 处理token为空

    setShowPopFn({
      [select.step]: true
    })
  }

  const storeFn = (val, list) => {
    if(!val) {
      Taro.showToast({
        title: '请选择门店',
        icon: 'none',
        mask: false,
      })
      return
    }
    setStoreList(list)
    if(loadingShopInfo) {
      return
    }
    setLoadingShopInfo(true)
    http({
      method: 'get',
      url: '/api/shop/queryById',
      data: {
        shopId: val
      }
    }).then(data => {
      setSelectStoreInfo({
        shopProjects: [],
        shopWorkers: (data.shopWorkers || []).filter(item => item.canBook === 1),
        detail: data
      })
      setSelect({
        ...select,
        shopId: val,
        projectId: undefined,
        personAndTime: undefined,
      })
      setShowPopFn({
        'store': false,
        'personAndTime': true,
      })
    }).finally(() => {
      setLoadingShopInfo(false)
    })
  }

  const projectFn = (val) => {
    if(!val) {
      Taro.showToast({
        title: '请选择项目',
        icon: 'none',
        mask: false,
      })
      return
    }
    if(loading) {
      return
    }
    setLoading(true)
    const postData = {
      ...select,
      projectId: val
    }
    setSelect(postData)
    const {personId, entryDate} = postData.personAndTime
    http({
      method: 'post',
      url: '/api/shop/book',
      data: {
        shopId: postData.shopId,
        projectId: postData.projectId,
        bookType: 'SPECIAL',
        workerId: personId,
        bookTime: entryDate,
        shopName: (storeList.find(item => item.shopId === postData.shopId) || {}).name,
        projectName: (selectStoreInfo.shopProjects.find(item => item.projectId === postData.projectId) || {}).name,
        workerName: (selectStoreInfo.shopWorkers.find(item => item.workerId === personId) || {}).name
      }
    }).then(() => {
      queryNewBook()
      setShowPopFn({'project': false})
    }).finally(() => {
      setLoading(false)
    })
  }

  const personAndTimeFn = (val, person) => {
    if(!val) {
      Taro.showToast({
        title: '请选择技师及时间',
        icon: 'none',
        mask: false,
      })
      return
    }
    setSelect({
      ...select,
      personAndTime: val,
      projectId: undefined,
    })
    setSelectStoreInfo({
      ...selectStoreInfo,
      shopProjects: person.workerProjects || []
    })
    setShowPopFn({
      'personAndTime': false,
      'project': true,
    })
  }

  const setShowPopFn = (newState) => {
    setShowPop({
      ...showPop,
      ...newState
    })
  }

  const backFn = (type) => {
    const newSelect = {...select}
    const newShowPop = {...showPop}
    switch(type) {
      case 'project':
        newSelect.projectId = undefined
        newShowPop.project = false
        newShowPop.personAndTime = true
        break
      case 'personAndTime':
        newSelect.personAndTime = undefined
        newShowPop.personAndTime = false
        newShowPop.store = true
        break
    }
    setSelect({
      ...select,
      ...newSelect
    })
    setShowPop({
      ...showPop,
      ...newShowPop
    })
  }

  return (
    <View className='custon-book-custom'>
      <View className='desc'>
        <View>可以<Text className='blod'>自由定制服务</Text></View>
        <View>点击下方按钮立即开始定制吧~</View>
      </View>
      <AtButton className='book-btn' type='primary' circle onClick={startBtnFn}>开始定制预约</AtButton>

      {showPop.store && <StoreListPop btnLoading={loadingShopInfo} OkBtnTxt='确定，下一步' maskClick onClose={() => setShowPopFn({'store': false})} onOk={storeFn} select={select.shopId} />}
      {showPop.project && <ProjectListPop btnLoading={loading} onBack={() => backFn('project')} OkBtnTxt='确定' list={selectStoreInfo.shopProjects} onClose={() => setShowPopFn({'project': false})} onOk={projectFn} select={select.projectId} />}
      {showPop.personAndTime && <PersonAndTimePop canBookTime={props.store?.canBookTime || (storeList.find(item => item.shopId === select.shopId) || {}).canBookTime} OkBtnTxt='确定，下一步' list={selectStoreInfo.shopWorkers} onBack={props.store ? null : () => backFn('personAndTime')} select={select.personAndTime} onClose={() => setShowPopFn({'personAndTime': false})} onOk={personAndTimeFn} />}
    </View>
  )
}

