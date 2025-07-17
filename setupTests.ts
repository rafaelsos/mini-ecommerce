jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}))

jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Circle: 'Circle',
  Path: 'Path',
  G: 'G',
  Defs: 'Defs',
  ClipPath: 'ClipPath',
  Rect: 'Rect',
}))

jest.mock('@/shared/assets/icons/icon-arrow-left.svg', () => 'IconArrowLeft')
jest.mock('@/shared/assets/icons/icon-cart.svg', () => 'IconCart')
jest.mock('@/shared/assets/icons/icon-catalog.svg', () => 'IconCatalog')
jest.mock('@/shared/assets/icons/icon-trash.svg', () => 'IconTrash')

jest.mock('redux-persist', () => ({
  persistReducer: jest.fn().mockImplementation((config, reducer) => reducer),
  persistStore: jest.fn().mockImplementation(() => ({
    purge: jest.fn(),
    flush: jest.fn(),
    pause: jest.fn(),
    persist: jest.fn(),
  })),
  FLUSH: 'FLUSH',
  REHYDRATE: 'REHYDRATE',
  PAUSE: 'PAUSE',
  PERSIST: 'PERSIST',
  PURGE: 'PURGE',
  REGISTER: 'REGISTER',
}))

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  Provider: ({ children }: { children: React.ReactNode }) => children,
}))

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}))

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}))

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  NavigationContainer: ({ children }: { children: React.ReactNode }) =>
    children,
}))
