import { ViewStyle, TextStyle } from "react-native"

const imageSize = 80

export const userHeaderStyles = {
  CONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    padding: 10
  } as ViewStyle,
  AVATAR_CONTAINER: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1
  } as ViewStyle,
  IMAGE_LAYOUT: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  },
  BALANCE_TEXT: {
    fontSize: 24,
    fontWeight: 'bold'
  } as TextStyle
}
