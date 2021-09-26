export const event = (function() {
  let clientList = []
  let trigger = function() {
    let key = Array.prototype.shift.call(arguments)
    let fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return
    }
    fns.forEach(item => {
      item.apply(this, arguments)
    })
  }
  let listen = function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  }
  let remove = function(key, fn) {
    let fns = this.clientList[key]
    if (!fns) {
      return
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (var i = 0; i < fns.length; i++) {
        if (fns[i] === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
  return {
    clientList,
    trigger,
    listen,
    remove,
  }
})()

const globalData = {
  bookData: {}, // 最新的预约记录
  isIPX: false,
  phoneModel: '', // 手机类型
}


export function setGlobalData (key, val) {
  globalData[key] = val
  event.trigger(key, val)
}

export function getGlobalData (key) {
  return globalData[key]
}

// demo
// event.listen('cusA', (data) => {
//   console.log(data.cusA)
// })
// event.listen('cusB', (data) => {
//   console.log(data.cusB)
// })

// event.trigger('cusA', { cusA: 'cusAAA', cusB: 'cusBBB' })
// event.trigger('cusA', { cusA: 'cusA22', cusB: 'cusBBB' })

// event.listen('userInfo', userInfo => {
//   console.log(userInfo, 'listen')
// })
