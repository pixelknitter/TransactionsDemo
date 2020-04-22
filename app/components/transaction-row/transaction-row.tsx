import * as React from "react"
import { View } from "react-native"
import { Text } from "../"
import { transactionRowStyles as styles } from "./transaction-row.styles"
import { Transaction } from "../../models/transaction"
import { format } from "date-fns"

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
  // Provides a comma delimited number up to 2 fractional digits
  const amountString = transaction.amount ? transaction.amount.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "N/A"

  const formattedAmount = isCredit ? amountString : `(${amountString})`
  const AMOUNT_STYLE = isCredit ? styles.CREDIT_TEXT : styles.DEBIT_TEXT
  const CONTAINER_STYLE = isCredit ? styles.CREDIT_CONTAINER : styles.CONTAINER

  return (
    <View style={CONTAINER_STYLE}>
      <View style={styles.DETAIL_CONTAINER}>
        <View style={styles.MERCHANT_CONTAINER}>
          <Text style={styles.DATE_TEXT} text={format(transaction.date, "yyyy-MM-dd")} />
          <Text style={styles.MERCHANT_TEXT} text={transaction.merchant} />
        </View>
        {/* Ensure that the details has a length otherwise don't render an element */}
        {hasDetails ? <Text style={styles.DETAILS_TEXT} text={transaction.details} /> : null}
      </View>
      <Text style={AMOUNT_STYLE} text={formattedAmount} />
    </View>
  )
}
