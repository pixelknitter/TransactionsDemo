import React, { useRef, useEffect } from "react"
import { View, Animated } from "react-native"
import { Text, AsyncImage } from "../"
import { userHeaderStyles as styles } from "./user-header.styles"
import { User } from '../../models/user'
import { color } from "../../theme"
import { flatten, mergeAll } from "ramda"

export interface UserHeaderProps {
  user: User
}

const useFadeInLeft = () => {
  const opacity = useRef(new Animated.Value(0.0)).current
  const xDelta = useRef(new Animated.Value(0.0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1.0,
        delay: 200,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(xDelta, {
        toValue: 1.0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start()
  }, [opacity, xDelta])

  return {
    opacity,
    xDelta
  }
}

/**
 * User Header
 *
 * Renders a header with details about the CurrentUser. Accepts a User object.
 */
export function UserHeader({ user }: UserHeaderProps) {
  const { opacity, xDelta } = useFadeInLeft()

  // don't render if the user is null
  if (!user) { return null }

  // merge styles for animation, fade in from the left 10
  const RIGHT_CONTAINER = mergeAll(flatten([styles.RIGHT_CONTAINER, {
    opacity: opacity,
    transform: [
      {
        translateX: xDelta.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20]
        })
      }
    ],
  }]))

  // conditional helpers
  const hasBalance = user?.balance
  const hasNegativeBalance = user?.balance < 0

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
      <Animated.View style={RIGHT_CONTAINER}>
        <Text preset="header" text={user.name} />
        <Text style={BALANCE_STYLE} text={formattedBalance} />
      </Animated.View>
    </View>
  )
}
