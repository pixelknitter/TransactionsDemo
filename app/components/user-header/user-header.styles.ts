import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { spacing, color } from "../../theme"

const IMAGE_SIZE = 80
const CONTAINER_HEIGHT = 100
const FONT_SIZE = 24

const balanceText = {
  fontSize: FONT_SIZE,
  fontWeight: '500'
}

export const userHeaderStyles = {
  CONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: CONTAINER_HEIGHT,
    padding: spacing[2] + spacing[1],
    backgroundColor: color.background
  } as ViewStyle,
  RIGHT_CONTAINER: {
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  } as ViewStyle,
  IMAGE_LAYOUT: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    borderColor: color.palette.lightBlue,
    borderWidth: 2,
    marginRight: spacing[2]
  } as ImageStyle,
  BALANCE_TEXT: {
    ...balanceText
  } as TextStyle,
  BALANCE_NEGATIVE_TEXT: {
    ...balanceText,
    color: color.palette.vibrantOrange
  } as TextStyle
}
