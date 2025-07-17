import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type TRoutes = {
  Catalog: undefined
  Cart: undefined
  ProductDetails: { productId: number }
}

export type TTabRoutesStack = {
  Tabs: undefined
  CatalogTab: undefined
  CartTab: undefined
}

export type TStackAndTabRoutes = TRoutes & TTabRoutesStack

export type TStackScreenProps<T extends keyof TStackAndTabRoutes> =
  NativeStackScreenProps<TStackAndTabRoutes, T>
