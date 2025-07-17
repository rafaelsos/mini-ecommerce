import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { horizontalScale, verticalScale } from '@/shared/utils/scaling'

import { COLORS } from '@/shared/theme/colors'

export const LoadingComponent: React.FC<{ testID: string }> = ({ testID }) => {
  return (
    <View
      testID={testID}
      style={styles.container}
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityLabel="Carregando"
      accessibilityHint="Aguarde enquanto o conteúdo está sendo carregado"
    >
      <ActivityIndicator
        size="large"
        color={COLORS.blue200}
        accessible={true}
        accessibilityLabel="Indicador de carregamento"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
  },
})
