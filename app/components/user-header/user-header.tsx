import React from "react"
import { View, Image } from "react-native"
import { Text } from "../"
import { userHeaderStyles as styles } from "./user-header.styles"
import { User } from '../../models/user'

export interface UserHeaderProps {
  user: User
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
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
      {/* TODO: swap with async progressive loading image component */}
      <Image style={styles.IMAGE_LAYOUT} source={{ uri: user.avatar }} />
      <View style={styles.RIGHT_CONTAINER}>
        <Text preset="header" text={user.name} />
        <Text style={BALANCE_STYLE} text={formattedBalance} />
      </View>
    </View>
  )
}
