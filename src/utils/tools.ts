function formatDate(date?: number) {
  const newData = date ? new Date(date) : new Date()
  const day =newData.getDate()
  const dayStr = day >= 10 ? day + '' : '0'+ day
  const month = newData.getMonth() + 1
  const monthStr = month >= 10 ? month + '' : '0'+ month
  return `${monthStr}/${dayStr}`
}

function formatTimeList(time: string, type: 'start' | 'end') {
  if(!time || time.indexOf(':') === -1) {
    return
  }
  let hour = +time.split(':')[0]
  let minute = +time.split(':')[1]
  // 处理非0、30的分钟
  if(minute > 30) { // 超过30分钟，分置位0，时加1
    hour = hour + 1
    minute = 0
  } else if (minute > 0 && minute < 30) { // 1-29，分置位30
    minute = 30
  }

  let timeList:string[] = []

  if(type === 'start') {
    timeList = [`${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : '30'}`]
    for(let i=hour+1; i<24; i++) {
      timeList.push(`${i < 10 ? '0' + i : i}:00`)
      timeList.push(`${i < 10 ? '0' + i : i}:30`)
    }
  } else if(type === 'end') {
    for(let i=0; i<=hour; i++) {
      if(i === hour) {
        timeList.push(`${i < 10 ? '0' + i : i}:00`)
        minute === 30 && timeList.push(`${i < 10 ? '0' + i : i}:30`)
      } else {
        timeList.push(`${i < 10 ? '0' + i : i}:00`)
        timeList.push(`${i < 10 ? '0' + i : i}:30`)
      }
    }
  }

  return timeList
}

export { formatDate, formatTimeList }