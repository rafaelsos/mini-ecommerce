import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartCreators } from '@/shared/store/cart/CartCreators'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'],
}

export const persistedCartReducer = persistReducer(
  persistConfig,
  CartCreators.reducer,
)

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const StoreConfig = () => {
  const persistor = persistStore(store as any)
  return { store, persistor }
}
