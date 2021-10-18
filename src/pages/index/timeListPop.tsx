import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import CustomPop from '@src/components/customPop'
import Nodata from '@src/components/noData'
import dayjs from 'dayjs'
import { getTimeList } from '@src/utils/tools'
import forceUpdateFn from '@src/hook/forceUpdate'

type dayType = 'todayList'|'tomorrowList'
interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  onBack?: () => void
  select?: number | undefined
  OkBtnTxt?: string
  timeStart: string
  timeEnd: string
}


export default function TimeListPop(props: Iprops) {
  const {timeStart, timeEnd} = props
  const [daySelect, setDaySelect] = useState<dayType>('todayList')
  const [select, setSelect] = useState(undefined)
  const [dayList, setDayList] = useState<string[]>([])
  const [timeList, setTimeList] = useState<{todayList: number[], tomorrowList: number[]}>({
    todayList: [],
    tomorrowList: []
  })

  const forceUpdate = forceUpdateFn()

  const dayMap = {
    0: 'todayList',
    1: 'tomorrowList',
  }

  useEffect(() => {
    setSelect(props.select)
  }, [props.select])

  useEffect(() => {
    // timeStart='22:00' timeEnd='次日01:00'
    // 今天 08/26
    if(!timeStart || !timeEnd) return
    const isTowDays = timeEnd.indexOf('次日') > -1
    const {todayList, tomorrowList} = getTimeList(timeStart, timeEnd.replace('次日', ''), 30, isTowDays)
    setDayList(['今天' + dayjs().format('MM/DD'), '明天' + dayjs(+new Date() + 24*60*60*1000).format('MM/DD')])
    setTimeList({todayList, tomorrowList})
  }, [timeStart, timeEnd])

  const selectFn = (val) => {
    if(val < +new Date()) {
      forceUpdate()
      Taro.showToast({
        title: '该时间不可预约',
        icon: 'none',
        mask: false,
      })
      return
    }

    setSelect(val)
  }

  return <CustomPop title='选择到店时间' maskClick headBorder={false} visible onBack={props.onBack} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)} OkBtnTxt='确认预约'>
    {(timeStart && timeEnd) ? <View className='custom-book-pop-wrap2'>
      <View className='time-bar-wrap'>
        {
          dayList.map((item, idx) => <View onClick={() => setDaySelect(dayMap[idx])} key={`${idx}-day`} className={`time-bar ${dayMap[idx] === daySelect ? 'active' : ''}`}>{item}</View>)
        }
      </View>
      {
        Object.values(dayMap).map(value => daySelect === value ? <View key={value} className='time-btn-wrap'>
          {
            timeList[value].map((item, idx) => <Text onClick={() => selectFn(item)} key={`${idx}-time`} className={`time-btn ${item < +new Date() ? 'disabled-none' : ''} ${select === item ? 'active' : ''}`}>{dayjs(item).format('HH:mm')}</Text>)
          }
        </View> : null)
      }
      {
        timeList['todayList'].filter(item => item > +new Date()).length === 0 && daySelect === 'todayList' ? <View className='no-data-txt'>今日已不可预约</View> : null
      }
      {
        timeList['tomorrowList'].filter(item => item > +new Date()).length === 0 && daySelect === 'tomorrowList' ? <View className='no-data-txt'>明天已不可预约</View> : null
      }
    </View> : <View className='custom-book-pop-wrap2'><Nodata /></View>}
  </CustomPop>
}