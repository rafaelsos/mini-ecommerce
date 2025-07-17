import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale, verticalScale } from '@/shared/utils/scaling'

import IconArrowLeft from '@/shared/assets/icons/icon-arrow-left.svg'

export const ButtonGoBack: React.FC = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.button}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      accessibilityHint="Toque para voltar à tela anterior"
    >
      <IconArrowLeft />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingRight: horizontalScale(8),
    paddingVertical: verticalScale(8),
    borderRadius: horizontalScale(8),
  },
})
