import { useState } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CustomPop from '@src/components/customPop'
import CustomAlert from '@src/components/customAlert'

function Demo() {
  const [visiblePop, setVisiablePop] = useState(false)
  const [visibleAlert, setVisiableAlert] = useState(false)

  return (
    <View>
      <AtButton type='primary' circle>大按钮</AtButton>
      <AtButton onClick={() => setVisiablePop(true)}>展示pop</AtButton>
      <AtButton onClick={() => setVisiableAlert(true)}>展示alert</AtButton>
      <CustomPop visible={visiblePop} title='标题' onClose={() => setVisiablePop(false)}>内容</CustomPop>
      <CustomAlert visible={visibleAlert} onClose={() => setVisiableAlert(false)}>内容</CustomAlert>
    </View>
  )
}

export default Demo
