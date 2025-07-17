import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { TabsConfigParamList } from '@/shared/routes/Tabs/TabsConfig.types'
import { CatalogStack } from '@/features/catalog/routes/CatalogStack'
import { CartStack } from '@/features/cart/routes/CartStack'
import IconCatalog from '@/shared/assets/icons/icon-catalog.svg'
import IconCart from '@/shared/assets/icons/icon-cart.svg'
import { COLORS } from '@/shared/theme/colors'

const Tab = createBottomTabNavigator<TabsConfigParamList>()

const CatalogIcon = () => <IconCatalog />

const CartIcon = () => <IconCart />

export const TabsConfig: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.blue200,
        tabBarInactiveTintColor: COLORS.black100,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="CatalogTab"
        component={CatalogStack}
        options={{
          title: 'Catálogo',
          tabBarIcon: CatalogIcon,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          title: 'Carrinho',
          tabBarIcon: CartIcon,
        }}
      />
    </Tab.Navigator>
  )
}
