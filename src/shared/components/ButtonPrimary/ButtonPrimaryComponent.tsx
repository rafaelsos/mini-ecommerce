import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '@/shared/theme/colors'
import {
  horizontalScale,
  verticalScale,
  fontScale,
} from '@/shared/utils/scaling'

export const ButtonPrimary: React.FC<{
  testID?: string
  title: string
  onPress: () => void
}> = ({ title, onPress, testID }) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={styles.button}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={`Toque para ${title.toLowerCase()}`}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue100,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    borderRadius: horizontalScale(8),
    alignItems: 'center',
  },
  text: {
    fontSize: fontScale(16),
    fontWeight: '700',
    color: COLORS.gray100,
  },
})
