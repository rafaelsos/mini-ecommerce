import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ButtonGoBack } from '@/shared/components/ButtonGoback/ButtonGobackComponent'
import { CartScreen } from '@/features/cart/screens/CartScreen'
import { CartStackParamList } from '@/features/cart/routes/CartStack.types'
import { COLORS } from '@/shared/theme/colors'

const Stack = createNativeStackNavigator<CartStackParamList>()

const buttonGoBack = () => <ButtonGoBack />

export const CartStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: '',
        headerShadowVisible: false,
        headerTintColor: COLORS.black100,
        headerStyle: { backgroundColor: COLORS.gray100 },
      }}
    >
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={() => ({
          title: 'Carrinho',
          headerLeft: buttonGoBack,
        })}
      />
    </Stack.Navigator>
  )
}
