import { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import CustomPop from '@src/components/customPop'
import Nodata from '@src/components/noData'
import { formatDate, formatTimeList } from '@src/utils/tools'

interface Iprops {
  visible?: boolean
  onClose?: (id) => void
  onOk?: (id) => void
  select?: string | undefined
  OkBtnTxt?: string
  timeStart: string
  timeEnd: string
}
export default function TimeListPop(props: Iprops) {
  const {timeStart, timeEnd} = props
  const [select, setSelect] = useState<string | undefined>(undefined)
  const [dayList, setDayList] = useState<string[]>([])
  const [timeList, setTimeList] = useState([])

  useEffect(() => {
    setSelect(props.select)
  }, [props.select])

  useEffect(() => {
    // timeStart='22:00' timeEnd='次日01:00'
    // 今天 08/26
    const _dayList = ['今天' + formatDate()]
    if(timeEnd.indexOf('次日') > -1) {
      _dayList.push('明天' + formatDate(+new Date() + 24*60*60*1000))
    }
    console.log(_dayList)
  }, [timeStart, timeEnd])

  const selectFn = (val) => {
    setSelect(val)
  }

  return <CustomPop title='选择到店时间' maskClick headBorder={false} visible={props.visible} onClose={() => props.onClose && props.onClose(select)} onOk={() => props.onOk && props.onOk(select)}>
    <View className='custom-book-pop-wrap2'>
      内容123
      {(!timeStart || !timeEnd) && <Nodata />}
    </View>
  </CustomPop>
}