import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import CustomPop from '@src/components/customPop'
import Nodata from '@src/components/noData'
import dayjs from 'dayjs'
import { getTimeList, hourToMillisecond } from '@src/utils/tools'

type dayType = 'todayList'|'tomorrowList'
export type selectTimeType = {type: dayType, time: string} | undefined
interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  select?: selectTimeType
  OkBtnTxt?: string
  timeStart: string
  timeEnd: string
}


export default function TimeListPop(props: Iprops) {
  const {timeStart, timeEnd} = props
  const [daySelect, setDaySelect] = useState<dayType>('todayList')
  const [select, setSelect] = useState<selectTimeType>(undefined)
  const [dayList, setDayList] = useState<string[]>([])
  const [timeList, setTimeList] = useState<{todayList: string[], tomorrowList: string[]}>({
    todayList: [],
    tomorrowList: []
  })
  const dayMap = {
    0: 'todayList',
    1: 'tomorrowList',
  }

  useEffect(() => {
    if(props.select?.time && props.select?.type) {
      setSelect(props.select)
    }
  }, [props.select])

  useEffect(() => {
    // timeStart='22:00' timeEnd='次日01:00'
    // 今天 08/26
    const isTowDays = timeEnd.indexOf('次日') > -1
    const {todayList, tomorrowList} = getTimeList(timeStart, timeEnd.replace('次日', ''), isTowDays)
    setDayList(['今天' + dayjs().format('MM/DD'), '明天' + dayjs(+new Date() + 24*60*60*1000).format('MM/DD')])
    setTimeList({todayList, tomorrowList})
  }, [timeStart, timeEnd])

  const selectFn = (val) => {
    const bookTime = dayjs().startOf('d').valueOf() + hourToMillisecond(val)
    if(daySelect === 'todayList' && bookTime < +new Date()) {
      Taro.showToast({
        title: '该时间不可预约',
        icon: 'none',
        mask: false,
      })
      return
    }

    setSelect({
      type: daySelect,
      time: val
    })
  }

  return <CustomPop title='选择到店时间' maskClick headBorder={false} visible={props.visible} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    <View className='custom-book-pop-wrap2'>
      <View className='time-bar-wrap'>
        {
          dayList.map((item, idx) => <View onClick={() => setDaySelect(dayMap[idx])} key={`${idx}-day`} className={`time-bar ${dayMap[idx] === daySelect ? 'active' : ''}`}>{item}</View>)
        }
      </View>
      {
        Object.values(dayMap).map(value => daySelect === value ? <View key={value} className='time-btn-wrap'>
          {
            timeList[value].map((item, idx) => <Text onClick={() => selectFn(item)} key={`${idx}-time`} className={`time-btn ${(dayjs().startOf('d').valueOf() + hourToMillisecond(item) < +new Date()) && daySelect === 'todayList' ? 'disabled-none' : ''} ${select?.time === item && select.type === value ? 'active' : ''}`}>{item}</Text>)
          }
        </View> : null)
      }
      {(!timeStart || !timeEnd) && <Nodata />}
    </View>
  </CustomPop>
}