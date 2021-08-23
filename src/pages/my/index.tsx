import { View, Text } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import './index.scss'

function Index() {
  return (
    <View className='index'>
      <Text>我的</Text>
      <CustomTabar active='my' />
    </View>
  )
}

export default Index
