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
  const [storeList, setStoreList] = useState([])
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

  useEffect(() => {
    if(!select.shopId) {
      setSelectStoreInfo({
        shopProjects: [],
        shopWorkers: [],
        detail: {}
      })

      return
    }
    queryShopInfo(select.shopId)
  }, [select.shopId])
  
  useEffect(() => {
    queryShopList()
  }, [])

  const queryShopList = () => {
    http({
      method: 'get',
      url: '/api/shop/list',
      data: {
        pageNo: 1,
        pageSize: 100,
      }
    }).then(data => {
      setStoreList((data.records || []).filter(item => item.canBook === 1))
    })
  }

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
        shopWorkers: data.shopWorkers || [],
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

  const storeFn = (val) => {
    if(!val) {
      Taro.showToast({
        title: '请选择门店',
        icon: 'none',
        mask: false,
      })
      return
    }
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
        entryDate,
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

      {showPop.store && <StoreListPop OkBtnTxt='确定，下一步' list={storeList} maskClick onClose={() => setShowPopFn({'store': false})} onOk={storeFn} select={select.shopId} />}
      {showPop.project && <ProjectListPop onBack={() => backFn('project')} OkBtnTxt='确定' list={selectStoreInfo.shopProjects} onClose={() => setShowPopFn({'project': false})} onOk={projectFn} select={select.projectId} />}
      {showPop.personAndTime && <PersonAndTimePop  OkBtnTxt='确定，下一步' list={selectStoreInfo.shopWorkers} onBack={props.store ? null : () => backFn('personAndTime')} select={select.personAndTime} onClose={() => setShowPopFn({'personAndTime': false})} onOk={personAndTimeFn} />}
    </View>
  )
}

