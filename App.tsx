import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { StoreConfig } from './src/shared/store/StoreConfig'
import { RootNavigator } from './src/shared/routes/RouteConfig'

const queryClient = new QueryClient()
const { store, persistor } = StoreConfig()

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

export default App
