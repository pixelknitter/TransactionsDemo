import * as React from "react"
import { View } from "react-native"
import { Text } from "../"
import { transactionRowStyles as styles } from "./transaction-row.styles"
import { Transaction } from "../../models/transaction"
import { format } from "date-fns"
import { color } from "../../theme"
import { mergeAll, flatten } from "ramda"

export interface TransactionRowProps {
  transaction: Transaction
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Renders the details of a transaction and expands to fit the content as needed.
 */
export const TransactionRow: React.FunctionComponent<TransactionRowProps> = props => {
  const { transaction } = props
  const isCredit = transaction.type === "credit"
  const hasDetails = transaction.details && transaction.details.length > 0

  // Provides a comma delimited number up to 2 fractional digits, display "N/A" if missing
  const amountString = transaction.amount ? transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "N/A"
  const formattedAmount = isCredit ? amountString : `(${amountString})`

  // Sets colors based upon whether the transaction is a credit or debit
  const amountTextColor = isCredit ? color.palette.seaGreen : color.palette.vibrantOrange
  const detailsTextColor = isCredit ? color.palette.richBlack : color.palette.offWhite
  const detailsBackgroundColor = isCredit ? color.palette.offWhite : color.palette.richBlack

  // Merge the styling to account for the different rows based upon transaction type
  const AMOUNT_STYLE = mergeAll(flatten([styles.AMOUNT_TEXT, { color: amountTextColor }]))
  const DETAILS_STYLE = mergeAll(flatten([styles.DETAILS_TEXT, { color: detailsTextColor }]))
  const CONTAINER_STYLE = mergeAll(flatten([styles.CONTAINER, { backgroundColor: detailsBackgroundColor }]))
  const MERCHANT_STYLE = mergeAll(flatten([styles.MERCHANT_TEXT, { color: detailsTextColor }]))
  const DATE_STYLE = mergeAll(flatten([styles.DATE_TEXT, { color: detailsTextColor }]))

  return (
    <View style={CONTAINER_STYLE}>
      <View style={styles.DETAIL_CONTAINER}>
        <View style={styles.MERCHANT_CONTAINER}>
          <Text style={DATE_STYLE} text={format(transaction.date, "MM-dd")} />
          <Text style={MERCHANT_STYLE} text={transaction.merchant} />
        </View>
        {/* Ensure that the details exist otherwise don't render an element */}
        {hasDetails ? <Text style={DETAILS_STYLE} text={transaction.details} /> : null}
      </View>
      <Text style={AMOUNT_STYLE} text={formattedAmount} />
    </View>
  )
}
