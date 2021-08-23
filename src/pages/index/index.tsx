import { View, Text } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import './index.scss'

function Index() {
  return (
    <View className='index'>
      <Text>主页</Text>
      <CustomTabar active='home' />
    </View>
  )
}

export default Index
