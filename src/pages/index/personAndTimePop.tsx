import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import dayjs from 'dayjs'
import CustomPop from '@src/components/customPop'
import {hourToMillisecond, dateTypeStr} from '@src/utils/tools'
import Nodata from '@src/components/noData'

const defaultImg = 'https://cdn.utoohappy.com/mini/default1.png'
type dayType = 'todayList'|'tomorrowList'
export interface ISelect {
  personId: string,
  bookDate: number,
  bookTime: string,
}

export interface ISelectPerson {
  workerId: string,
  name: string,
  pic: string,
  desc: string,
  workerSchedule: any[]
}

interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  onBack?: () => void
  select?: ISelect | undefined
  OkBtnTxt?: string
  list: any[]
}

export default function PersonAndTimePop(props: Iprops) {
  const [person, setPerson] = useState<ISelectPerson | undefined>()
  const [select, setSelect] = useState<ISelect | undefined>(undefined)
  const [descCollapse, setDescCollapse] = useState(true)

  useEffect(() => {
    setSelect(props.select)
  }, [props.select])

  useEffect(() => {
    if(props.list.length) {
      selectPersonFn(props.list[0])
    }
  }, [props.list])

  const selectTimeFn = (item,subItem) => {
    if(subItem.isBooked || caculTimeLabelStatus(item.bookDate, subItem.bookTime) === 'disabled') {
      Taro.showToast({
        title: '该时间不可预约',
        icon: 'none',
        mask: false,
      })
      return
    }
    setSelect({
      personId: person.workerId,
      bookDate: item.bookDate,
      bookTime: subItem.bookTime,
    })
  }

  const selectPersonFn = (personObj) => {
    setPerson(personObj)
    setDescCollapse(true)
  }

  const caculTimeLabelStatus = (date, time) => {
    const timeStart = (time || '').split('-')
    if(!date || !timeStart[0]) {
      return 'disabled'
    }
    const currentTime = dayjs(date).startOf('d').valueOf() + hourToMillisecond(timeStart[0])
    return currentTime < +new Date() ? 'disabled' : ''
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
          person?.workerSchedule.map((item, idx) => <View key={`bookList${idx}`}>
            <View className='time-title'>{dateTypeStr(item.bookDate)} {dayjs(item.bookDate).format('MM/DD')}</View>
            <View className='time-btn-wrap'>
              {
                item.bookDateTime.map((subItem, subIdx) => <Text onClick={() => selectTimeFn(item, subItem)} key={`${subIdx}-time`} className={`time-btn ${subItem.isBooked ? 'disabled isbook' : ''} ${caculTimeLabelStatus(item.bookDate, subItem.bookTime)} ${(select?.bookDate === item.bookDate && select?.bookTime === subItem.bookTime &&  select?.personId === person?.workerId)? 'active' : ''}`}>{subItem.bookTime}</Text>)
              }
            </View>
          </View>)
        }
      </View>
    </View> : <View className='custom-book-pop-wrap2 date-wrap'><Nodata /></View>}
  </CustomPop>
}