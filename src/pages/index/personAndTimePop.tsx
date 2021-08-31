import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import CustomPop from '@src/components/customPop'
import { formatDate, getTimeList } from '@src/utils/tools'
import defaultImg from '@image/default1.png'

type dayType = 'todayList'|'tomorrowList'
export interface ISelect {
  selectTimetype: dayType | undefined,
  selectTime: string | undefined,
  personId: string,
  personName: string,
  timeStart: string,
  timeEnd: string
}

export interface ISelectPerson {
  id: string,
  name: string,
  timeStart: string,
  timeEnd: string,
  avater: string,
  desc: string
}

interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  select?: ISelect | undefined
  OkBtnTxt?: string
}

const PRESON_DATA = [
  {id: '1', name: '技师1技师1技师1技师1技师', timeStart: '22:00', timeEnd: '次日01:00', avater: defaultImg, desc: '资深技师，10年推拿经验，高级产后恢复师资深技师，10年推拿经验，高级产后恢复sdghdsjka'},
  {id: '2', name: '技师2', timeStart: '22:00', timeEnd: '23:30', avater: defaultImg, desc: '123'}
]

export default function PersonAndTimePop(props: Iprops) {
  const [person, setPerson] = useState<ISelectPerson | undefined>()
  const [select, setSelect] = useState<ISelect | undefined>(undefined)
  const [personList, setPersonList] = useState<ISelectPerson[]>(PRESON_DATA)
  const [dayList, setDayList] = useState<string[]>([])
  const [timeList, setTimeList] = useState<{todayList: string[], tomorrowList: string[]}>({
    todayList: [],
    tomorrowList: []
  })
  const [descCollapse, setDescCollapse] = useState(true)

  useEffect(() => {
    if(props.select) {
      setSelect(props.select)
    }
  }, [props.select])

  useEffect(() => {
    selectPersonFn(personList[0])
  }, [])

  const updateTimeLayout = function(timeStart, timeEnd) {
    if(!(timeStart && timeEnd)) {
      return
    }
    // enterTime: timeStart='22:00' timeEnd='次日01:00'
    const isTowDays = timeEnd.indexOf('次日') > -1
    const _dayList = ['今天' + formatDate()] // format: 今天 08/26
    if(isTowDays) {
      _dayList.push('明天' + formatDate(+new Date() + 24*60*60*1000))
    }
    const {todayList, tomorrowList} = getTimeList(timeStart, timeEnd.replace('次日', ''), isTowDays)
    setDayList(_dayList)
    setTimeList({todayList, tomorrowList})
  }

  const selectTimeFn = (time, selectTimetype) => {
    const {timeStart, timeEnd, id, name} = personList.filter(item => item.id === person?.id)[0] || {}
    updateTimeLayout(timeStart, timeEnd)
    setSelect({
      selectTimetype,
      selectTime: time,
      timeStart: timeStart,
      timeEnd: timeEnd,
      personId: id,
      personName: name
    })
  }

  const selectPersonFn = (personObj) => {
    const {timeStart, timeEnd} = personList.filter(item => item.id === personObj.id)[0] || {}
    updateTimeLayout(timeStart, timeEnd)
    setPerson(personObj)
    setDescCollapse(true)
  }

  return <CustomPop title='选择技师、时段' onBack={() => console.log('back')} headBorder={false} visible={props.visible} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    <View className='custom-book-pop-wrap2'>
      <View className='time-bar-wrap'>
        {
          personList.map((item, idx) => <View onClick={() => selectPersonFn(item)} key={`${idx}-person`} className={`time-bar ${item?.id === person?.id ? 'active' : ''}`}>{item.name}</View>)
        }
      </View>
      <View>
        <View className='person-desc'>
          <View>技师介绍</View>
          <View className='img-wrap'>
            <Image className='left' src={defaultImg} />
            <View className='right'>{person?.name}</View>
          </View>
          {(person && person?.desc?.length > 40)
          ? <View>
              {descCollapse ? person?.desc.substring(0, 40) + '...' : person?.desc}
              <Text className='collapse' onClick={() => setDescCollapse(!descCollapse)}>{descCollapse ? '展开' : '收起'}</Text>
            </View>
          : <View>{person?.desc}</View> }
        </View>
        {timeList.todayList.length > 0 && <View>
          <View className='time-title'>{dayList[0]}</View>
          <View className='time-btn-wrap'>
            {
              timeList.todayList.map((item, idx) => <Text onClick={() => selectTimeFn(item, 'todayList')} key={`${idx}-time`} className={`time-btn ${(select?.selectTime === item && select?.selectTimetype === 'todayList' && select?.personId === person?.id)? 'active' : ''}`}>{item}</Text>)
            }
          </View>
        </View>}
        {timeList.tomorrowList.length > 0 && <View>
          <View className='time-title'>{dayList[1]}</View>
          <View className='time-btn-wrap'>
            {
              timeList.tomorrowList.map((item, idx) => <Text onClick={() => selectTimeFn(item, 'tomorrowList')} key={`${idx}-time`} className={`time-btn ${(select?.selectTime === item && select?.selectTimetype === 'tomorrowList' && select?.personId === person?.id) ? 'active' : ''}`}>{item}</Text>)
            }
          </View>  
        </View>}
      </View>
    </View>
  </CustomPop>
}