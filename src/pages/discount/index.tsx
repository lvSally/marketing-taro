import { View, Text } from '@tarojs/components'
import CustomTabar from '@src/components/customTabar'
import './index.scss'

function Index() {
  return (
    <View className='index'>
      <Text>优惠</Text>
      <CustomTabar active='discount' />
    </View>
  )
}

export default Index
