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
  fontSize: 18
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
  } as ViewStyle,
  MERCHANT_CONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  MERCHANT_TEXT: {
    ...detailsText,
    fontWeight: 'bold',
    fontSize: 20
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
