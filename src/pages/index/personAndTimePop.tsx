import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import dayjs from 'dayjs'
import CustomPop from '@src/components/customPop'
import defaultImg from '@image/default1.png'

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

  return <CustomPop title='选择技师、时段' onBack={props.onBack} headBorder={false} visible={props.visible} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    {person && <View className='custom-book-pop-wrap2'>
      <View className='time-bar-wrap'>
        {
          props.list.map((item, idx) => <View onClick={() => selectPersonFn(item)} key={`${idx}-person`} className={`time-bar ${item?.workerId === person?.workerId ? 'active' : ''}`}>{item.name}</View>)
        }
      </View>
      <View>
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
            <View className='time-title'>{dayjs(item.bookDate).format('MM/DD')}</View>
            <View className='time-btn-wrap'>
              {
                item.bookDateTime.map((subItem, subIdx) => <Text onClick={() => selectTimeFn(item, subItem)} key={`${subIdx}-time`} className={`time-btn ${(select?.bookDate === item.bookDate && select?.bookTime === subItem.bookTime &&  select?.personId === person?.workerId)? 'active' : ''}`}>{subItem.bookTime}</Text>)
              }
            </View>
          </View>)
        }
      </View>
    </View>}
  </CustomPop>
}