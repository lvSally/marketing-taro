import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import dayjs from 'dayjs'
import CustomPop from '@src/components/customPop'
import {getTimeList} from '@src/utils/tools'
import Nodata from '@src/components/noData'

const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
export interface ISelect {
  personId: string,
  entryDate: number,
}

export interface ISelectPerson {
  workerId: string,
  name: string,
  pic: string,
  desc: string,
}

interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  onBack?: () => void
  select?: ISelect | undefined
  OkBtnTxt?: string
  list: any[],
  busiHours: string
}

export default function PersonAndTimePop(props: Iprops) {
  const [person, setPerson] = useState<ISelectPerson | undefined>()
  const [select, setSelect] = useState<ISelect | undefined>(undefined)
  const [descCollapse, setDescCollapse] = useState(true)
  const [dayList, setDayList] = useState<string[]>([])
  const [timeList, setTimeList] = useState([[], []])
  // todo: 切换不同技师时更新已预定和不可预约

  useEffect(() => {
    setSelect(props.select)
  }, [props.select])

  useEffect(() => {
    const busiHoursArr = props.busiHours?.split('-')
    if(busiHoursArr?.length === 2) {
      const timeStart = busiHoursArr[0]
      const timeEnd = busiHoursArr[1]
      const isTowDays = timeEnd.indexOf('次日') > -1
      const {todayList, tomorrowList} = getTimeList(timeStart, timeEnd.replace('次日', ''), 90, isTowDays)
      setDayList(['今天 ' + dayjs().format('MM/DD'), '明天 ' + dayjs(+new Date() + 24*60*60*1000).format('MM/DD')])
      setTimeList([todayList, tomorrowList])
    }
  }, [props.busiHours])

  useEffect(() => {
    if(props.list?.length) {
      selectPersonFn(props.list[0])
    }
  }, [props.list])

  const selectTimeFn = (time) => {
    // if(subItem.isBooked || caculTimeLabelStatus(item.bookDate) === 'disabled') {
    //   Taro.showToast({
    //     title: '该时间不可预约',
    //     icon: 'none',
    //     mask: false,
    //   })
    //   return
    // }
    setSelect({
      personId: person.workerId,
      entryDate: time,
    })
  }

  const selectPersonFn = (personObj) => {
    setPerson(personObj)
    setDescCollapse(true)
  }

  return <CustomPop title='选择技师、时段' onBack={props.onBack} headBorder={false} visible={props.visible} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    {person ? <View className='custom-book-pop-wrap2'>
      <View className='time-bar-wrap'>
        {
          props.list.map((item, idx) => <View onClick={() => selectPersonFn(item)} key={`${idx}-person`} className={`time-bar ${item?.workerId === person?.workerId ? 'active' : ''}`}>{item.name || '-'}</View>)
        }
      </View>
      <View className='person-wrap'>
        <View className='person-desc'>
          <View>技师介绍</View>
          <View className='img-wrap'>
            <Image className='left' src={person.pic || defaultImg} />
            <View className='right'>{person?.name}</View>
          </View>
          {(person && person?.desc?.length > 40)
          ? <View>
              {descCollapse ? person?.desc.substring(0, 40) + '...' : person?.desc}
              <Text className='collapse' onClick={() => setDescCollapse(!descCollapse)}>{descCollapse ? '展开' : '收起'}</Text>
            </View>
          : <View>{person?.desc}</View> }
        </View>
        {
          dayList.map((value, idx) => <View key={`${idx}-date`}>
            <View className='time-title'>{value}</View>
            <View className='time-btn-wrap'>
              {
                timeList[idx].map(item => <Text onClick={() => selectTimeFn(item)} key={`${item}-time`} className={`time-btn ${item < +new Date() ? 'disabled' : ''} ${select?.entryDate === item ? 'active' : ''}`}>{dayjs(item).format('HH:mm')}</Text>)
              }
            </View>
          </View>)
        }
      </View>
    </View> : <View className='custom-book-pop-wrap2 date-wrap'><Nodata /></View>}
  </CustomPop>
}