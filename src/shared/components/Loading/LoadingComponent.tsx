import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { COLORS } from '@/shared/theme/colors'

export const LoadingComponent: React.FC<{ testID: string }> = ({ testID }) => {
  return (
    <View testID={testID} style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.blue200} />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
  },
})
