import { ViewStyle, TextStyle } from "react-native"
import { spacing } from '../../theme'

const MARGIN = 2
const ROW_FONT = 18

export const transactionRowStyles = {
  CONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    margin: MARGIN,
    padding: spacing[2],
    elevation: 2,
  } as ViewStyle,
  DETAIL_CONTAINER: {
    flexDirection: 'column',
    flexGrow: 1
  } as ViewStyle,
  MERCHANT_CONTAINER: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  } as ViewStyle,
  MERCHANT_TEXT: {
    fontWeight: 'bold',
    marginLeft: spacing[2],
    fontSize: ROW_FONT
  } as TextStyle,
  DATE_TEXT: {
    fontWeight: '300',
    fontSize: ROW_FONT
  } as TextStyle,
  AMOUNT_TEXT: {
    fontSize: ROW_FONT,
    fontWeight: '600',
    alignSelf: 'flex-start'
  } as TextStyle,
  DETAILS_TEXT: {
    fontSize: 14,
    marginTop: spacing[2]
  } as TextStyle
}
