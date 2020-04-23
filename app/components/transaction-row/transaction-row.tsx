import React, { useRef, useEffect } from "react"
import { View, Animated } from "react-native"
import { Text } from "../"
import { transactionRowStyles as styles } from "./transaction-row.styles"
import { Transaction } from "../../models/transaction"
import { format } from "date-fns"
import { color } from "../../theme"
import { mergeAll, flatten } from "ramda"

export interface TransactionRowProps {
  transaction: Transaction
}

const useSpringEntryLeft = () => {
  const xDelta = useRef(new Animated.Value(0.0)).current
  const opacity = useRef(new Animated.Value(0.0)).current

  const spring = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1.0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.spring(xDelta, {
        toValue: 1,
        tension: 16,
        useNativeDriver: true
      })
    ]).start()
  }

  useEffect(() => {
    spring()
  }, [opacity, xDelta])

  return { xDelta, opacity }
}

/**
 * Transaction Row
 *
 * Renders the details of a transaction accepting a Transaction
 */
export const TransactionRow: React.FunctionComponent<TransactionRowProps> = props => {
  const { transaction } = props
  const { xDelta, opacity } = useSpringEntryLeft()

  // translation for the main view with some randomness (via the transaction month)
  const randomDelay = transaction.date.getMonth() / 2
  const translateX = xDelta.interpolate({
    inputRange: [0, 1],
    outputRange: [250 * randomDelay, 1]
  })

  // conditionals
  const isCredit = transaction.type === "credit"
  const hasDetails = transaction.details && transaction.details.length > 0

  // provides a comma delimited number up to 2 fractional digits, display "N/A" if missing
  const amountString = transaction.amount ? transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "N/A"
  const formattedAmount = isCredit ? amountString : `(${amountString})`

  // pets colors based upon whether the transaction is a credit or debit
  const amountTextColor = isCredit ? color.palette.seaGreen : color.palette.vibrantOrange
  const detailsTextColor = isCredit ? color.palette.richBlack : color.palette.offWhite
  const detailsBackgroundColor = isCredit ? color.palette.offWhite : color.palette.richBlack

  // merge the styling to account for the different rows based upon transaction type
  const AMOUNT_STYLE = mergeAll(flatten([styles.AMOUNT_TEXT, { color: amountTextColor }]))
  const DETAILS_STYLE = mergeAll(flatten([styles.DETAILS_TEXT, { color: detailsTextColor }]))
  const CONTAINER_STYLE = mergeAll(flatten([styles.CONTAINER, {
    backgroundColor: detailsBackgroundColor,
    transform: [{ translateX }],
    opacity: opacity
  }]))
  const MERCHANT_STYLE = mergeAll(flatten([styles.MERCHANT_TEXT, { color: detailsTextColor }]))
  const DATE_STYLE = mergeAll(flatten([styles.DATE_TEXT, { color: detailsTextColor }]))

  return (
    <Animated.View style={CONTAINER_STYLE}>
      <View style={styles.DETAIL_CONTAINER}>
        <View style={styles.MERCHANT_CONTAINER}>
          <Text style={DATE_STYLE} text={format(transaction.date, "MM-dd")} />
          <Text style={MERCHANT_STYLE} text={transaction.merchant} />
        </View>
        {/* Ensure that the details exist otherwise don't render an element */}
        {hasDetails ? <Text style={DETAILS_STYLE} text={transaction.details} /> : null}
      </View>
      <Text style={AMOUNT_STYLE} text={formattedAmount} />
    </Animated.View>
  )
}
