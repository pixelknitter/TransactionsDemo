import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from '../../theme'

const MARGIN = 1

const container = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'space-between',
  margin: MARGIN,
  padding: spacing[2]
}

const detailsText = {
  fontSize: 14,
  color: color.palette.richBlack,
}

const balanceText = {
  fontSize: 18,
  fontWeight: '600',
  alignSelf: 'flex-start'
}

export const transactionRowStyles = {
  CONTAINER: {
    ...container,
    backgroundColor: color.palette.offWhite
  } as ViewStyle,
  CREDIT_CONTAINER: {
    ...container,
    backgroundColor: color.palette.white
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
    ...detailsText,
    fontWeight: 'bold',
    marginLeft: spacing[2],
    fontSize: 20
  } as TextStyle,
  DATE_TEXT: {
    ...detailsText,
    fontWeight: '300',
    fontSize: 16
  } as TextStyle,
  CREDIT_TEXT: {
    ...balanceText,
    color: color.palette.seaGreen
  } as TextStyle,
  DEBIT_TEXT: {
    ...balanceText,
    color: color.palette.vibrantOrange
  } as TextStyle,
  DETAILS_TEXT: {
    ...detailsText
  } as TextStyle
}
