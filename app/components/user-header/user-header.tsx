import React, { useEffect, useState } from "react"
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

  // format the balance with comma delimination and a fixed fraction
  const formattedBalance = user.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })
  // TODO: add a styling change if it goes negative

  return (
    <View style={styles.CONTAINER}>
      <View style={styles.AVATAR_CONTAINER}>
        <Image source={{ uri: user.avatar }} style={styles.IMAGE_LAYOUT} />
        <Text preset="header" text={user.name} />
      </View>
      <Text style={styles.BALANCE_TEXT} text={`$${formattedBalance}`} />
    </View>
  )
}
