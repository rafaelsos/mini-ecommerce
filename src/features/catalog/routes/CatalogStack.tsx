import { TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ButtonGoBack } from '@/shared/components/ButtonGoback/ButtonGobackComponent'
import { CatalogScreen } from '@/features/catalog/screens/CatalogScreen'
import { ProductDetailsScreen } from '@/features/catalog/screens/ProductDetailsScreen'
import { CatalogStackParamList } from '@/features/catalog/routes/CatalogStack.types'
import { COLORS } from '@/shared/theme/colors'
import IconCart from '@/shared/assets/icons/icon-cart.svg'

const Stack = createNativeStackNavigator<CatalogStackParamList>()

const buttonGoBack = () => <ButtonGoBack />

const buttonNavigationCart = (navigation: any) => (
  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
    <IconCart />
  </TouchableOpacity>
)

export const CatalogStack: React.FC = () => {
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
        name="Catalog"
        component={CatalogScreen}
        options={({ navigation }) => ({
          title: 'Catálogo',
          headerRight: () => buttonNavigationCart(navigation),
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={() => ({
          title: 'Detalhes do Produto',
          headerLeft: buttonGoBack,
        })}
      />
    </Stack.Navigator>
  )
}
