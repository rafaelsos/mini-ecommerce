import { Dimensions } from 'react-native'

const getScreenDimensions = () => Dimensions.get('window')

const { width, height } = getScreenDimensions()

const guidelineBaseWidth: number = 375
const guidelineBaseHeight: number = 812

const horizontalScale = (size: number): number =>
  (width / guidelineBaseWidth) * size

const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size

const fontScale = (size: number, factor: number = 0.5): number =>
  size + (horizontalScale(size) - size) * factor

const windowWidth = width
const windowHeight = height

const isSmallScreen = width < 375
const isLargeScreen = width > 414
const isTablet = width >= 768

export {
  horizontalScale,
  verticalScale,
  fontScale,
  windowWidth,
  windowHeight,
  isSmallScreen,
  isLargeScreen,
  isTablet,
  getScreenDimensions,
}
