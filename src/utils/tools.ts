import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import http from '@http'
import { setGlobalData } from '@globalData'

function formatDate(date?: number) {
  const newData = date ? new Date(date) : new Date()
  const day =newData.getDate()
  const dayStr = day >= 10 ? day + '' : '0'+ day
  const month = newData.getMonth() + 1
  const monthStr = month >= 10 ? month + '' : '0'+ month
  return `${monthStr}/${dayStr}`
}

function getTimeList(start, end, crossADay=false) {
  const _start = minutesFormat(start, 'start')
  const _end = minutesFormat(end, 'end')
  if(!_start || !_end) {
    return {todayList: [], tomorrowList: []}
  }

  const todayList: string[] = []
  const tomorrowList: string[] = []
  if(crossADay) { // 存在跨天
    // first day
    if(_start.minute === 30) {
      todayList.push(`${_start.hour < 10 ? '0' + _start.hour : _start.hour}:30`)
    } else {
      todayList.push(`${_start.hour < 10 ? '0' + _start.hour : _start.hour}:00`)
      todayList.push(`${_start.hour < 10 ? '0' + _start.hour : _start.hour}:30`)
    }

    for(let i=_start.hour+1; i<24; i++) {
      todayList.push(`${i < 10 ? '0' + i : i}:00`)
      todayList.push(`${i < 10 ? '0' + i : i}:30`)
    }

    for(let i=0; i<_end.hour; i++) {
      tomorrowList.push(`${i < 10 ? '0' + i : i}:00`)
      tomorrowList.push(`${i < 10 ? '0' + i : i}:30`)
    }
    // last day
    if(_end.minute === 30) {
      tomorrowList.push(`${_end.hour < 10 ? '0' + _end.hour : _end.hour}:00`)
      tomorrowList.push(`${_end.hour < 10 ? '0' + _end.hour : _end.hour}:30`)
    } else {
      tomorrowList.push(`${_end.hour < 10 ? '0' + _end.hour : _end.hour}:00`)
    }
  } else {
    // first day
    if(_start.minute === 30) {
      todayList.push(`${_start.hour < 10 ? '0' + _start.hour : _start.hour}:30`)
    } else {
      todayList.push(`${_start.hour < 10 ? '0' + _start.hour : _start.hour}:00`)
      todayList.push(`${_start.hour < 10 ? '0' + _start.hour : _start.hour}:30`)
    }
    // other
    for(let i=_start.hour + 1; i<_end.hour; i++) {
      todayList.push(`${i < 10 ? '0' + i : i}:00`)
      todayList.push(`${i < 10 ? '0' + i : i}:30`)
    }
    // last day
    if(_end.minute === 30) {
      todayList.push(`${_end.hour < 10 ? '0' + _end.hour : _end.hour}:30`)
    } else {
      todayList.push(`${_end.hour < 10 ? '0' + _end.hour : _end.hour}:00`)
      todayList.push(`${_end.hour < 10 ? '0' + _end.hour : _end.hour}:30`)
    }
  }

  return {
    todayList, tomorrowList
  }
}

function minutesFormat(time, type: 'start' | 'end') { // time: 22: 01
  if(!time || time.indexOf(':') === -1) {
    return false
  }
  let hour = +time.split(':')[0]
  let minute = +time.split(':')[1]
  if(hour>24 || hour<0 || minute>60 || minute<0) {
    return
  }
  if(type === 'start') { // 开始时间
    if(minute > 30) { // 超过30分钟，分置位0，时加1
      hour = hour + 1
      minute = 0
    } else if (minute > 0 && minute < 30) { // 1-29，分置位30
      minute = 30
    }
  } else { // 结束时间
    if(minute > 30) { // 超过30分钟，分置位0，时加1
      minute = 30
    } else if (minute > 0 && minute < 30) { // 1-29，分置位30
      minute = 0
    }
  }
  
  return { hour, minute }
}

function encryptPhone(str) {
  return str.length === 11 ? str.substr(0,4) + '***' + str.substr(7,11) : '--';
}

const hourToMillisecond = (timeStr) => {
  const timeArr = timeStr.split(':')
  if(timeArr.length !== 2) return 0
  let hour = +timeArr[0]
  let mins = +timeArr[1]
  return hour*60*60*1000 + mins*60*1000
}

const dateTypeStr = (date) => {
  if(!date) return ''
  if(dayjs(date).startOf('d').valueOf() === dayjs().startOf('d').valueOf()) {
    return '今天'
  }
  if(dayjs(date).startOf('d').valueOf() === (dayjs().startOf('d').valueOf() + 24*60*60*1000)) {
    return '明天'
  }
}

const linkToLogin = (redirect) => {
  if(!Taro.getStorageSync('token')) {
    Taro.navigateTo({
      url: `/pages/login/index?redirect=${redirect}`,
    })
    return true
  }
  return false
}

const notOpenDate = () => {
  return false
  if(+new Date() < dayjs('2021-10-01').valueOf()) {
    Taro.showToast({
      title: '10月1日正式开放预约，敬请期待',
      icon: 'none',
      mask: false,
    })
    return true
  }
  return false
}

const queryNewBook = () => {
  http({
    method: 'get',
    url: '/api/shop/queryNew',
    data: {}
  }).then(data => {
    setGlobalData('bookData', data || {})
  })
}

export { formatDate, getTimeList, encryptPhone, hourToMillisecond, linkToLogin, notOpenDate, queryNewBook, dateTypeStr }