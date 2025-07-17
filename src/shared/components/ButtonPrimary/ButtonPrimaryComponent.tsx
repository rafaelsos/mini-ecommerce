import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '@/shared/theme/colors'

export const ButtonPrimary: React.FC<{
  testID?: string
  title: string
  onPress: () => void
}> = ({ title, onPress, testID }) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue100,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray100,
  },
})
