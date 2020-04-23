import React from "react"
import { View } from "react-native"
import { Text, AsyncImage } from "../"
import { userHeaderStyles as styles } from "./user-header.styles"
import { User } from '../../models/user'
import { color } from "../../theme"

export interface UserHeaderProps {
  user: User
}

/**
 * User Header
 *
 * Renders a header with details about the CurrentUser. Accepts a User object.
 */
export function UserHeader(props: UserHeaderProps) {
  // grab the props
  const { user } = props

  // don't render if the user is null
  if (!user) { return null }

  // conditional helpers
  const hasBalance = user && user.balance
  const hasNegativeBalance = hasBalance && user.balance < 0

  // format the balance with comma delimination and a fixed fraction, make it unsigned
  const balanceString = hasBalance && Math.abs(user.balance).toLocaleString(undefined, { maximumFractionDigits: 2 })
  const formattedBalance = hasNegativeBalance ? `($${balanceString})` : `$${balanceString}`

  // set styling based upon balance negativity
  const BALANCE_STYLE = hasNegativeBalance ? styles.BALANCE_NEGATIVE_TEXT : styles.BALANCE_TEXT

  return (
    <View style={styles.CONTAINER}>
      <AsyncImage style={styles.IMAGE_LAYOUT}
        source={{ uri: user.avatar }}
        placeholderColor={color.palette.tealBlue}
      />
      <View style={styles.RIGHT_CONTAINER}>
        <Text preset="header" text={user.name} />
        <Text style={BALANCE_STYLE} text={formattedBalance} />
      </View>
    </View>
  )
}
