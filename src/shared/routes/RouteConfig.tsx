import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LinkingOptions, NavigationContainer } from '@react-navigation/native'

import { TabsConfig } from '@/shared/routes/Tabs/TabsConfig'
import { TStackAndTabRoutes } from '@/shared/routes/RouteConfig.types'

const Stack = createNativeStackNavigator<TStackAndTabRoutes>()

const linking: LinkingOptions<TStackAndTabRoutes> = {
  prefixes: ['meuapp://'],
  config: {
    screens: {
      Tabs: {
        screens: {
          CatalogTab: {
            screens: {
              Catalog: {
                path: 'catalog',
                exact: true,
              },
              ProductDetails: {
                path: 'produto/:productId',
                parse: {
                  productId: (productId: string) => productId,
                },
              },
            },
            initialRouteName: 'Catalog',
          },
        },
      },
    },
  },
}

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabsConfig} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
