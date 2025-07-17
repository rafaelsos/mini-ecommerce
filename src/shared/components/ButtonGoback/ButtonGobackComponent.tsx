import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconArrowLeft from '@/shared/assets/icons/icon-arrow-left.svg'

export const ButtonGoBack: React.FC = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <IconArrowLeft />
    </TouchableOpacity>
  )
}
