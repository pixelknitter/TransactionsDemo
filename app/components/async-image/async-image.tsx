import React, { useState, useRef, useEffect } from "react"
import { View, Animated } from "react-native"
import { asyncImageStyles as styles } from "./async-image.styles"
import { mergeAll, flatten } from "ramda"

export interface AsyncImageProps {
  placeholderColor,
  style?,
  source
}

const useImplosionExplosion = () => {
  const imageOpacity = useRef(new Animated.Value(0.0)).current
  const placeholderOpacity = useRef(new Animated.Value(1.0)).current
  const placeholderScale = useRef(new Animated.Value(1.0)).current
  const [loaded, setLoaded] = useState(false)

  const animateImage = () => {
    Animated.sequence([
      // Implode
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true
        }),
      ]),

      // Explode
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 225,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      setLoaded(true)
    })
  }

  useEffect(() => {
    animateImage()
  }, [loaded])

  return {
    loaded,
    setLoaded,
    imageOpacity,
    placeholderOpacity,
    placeholderScale,
    animateImage
  }
}

/**
 * Async Image
 *
 * An asynchronous image loader with animation and placeholder color
 */
export const AsyncImage: React.FunctionComponent<AsyncImageProps> = props => {
  const { placeholderColor, style, source } = props
  const { loaded, imageOpacity, placeholderOpacity, placeholderScale } = useImplosionExplosion()

  // manage the sources of styles
  const CONTAINER_STYLE = mergeAll(flatten([style, styles.WRAPPER]))
  const IMAGE_STYLE = mergeAll(flatten([style, styles.IMAGE, {
    opacity: imageOpacity,
  }]))
  const PLACEHOLDER_STYLE = mergeAll(flatten([style, styles.PLACEHOLDER, {
    backgroundColor: placeholderColor,
    opacity: placeholderOpacity,
    transform: [{ scale: placeholderScale }]
  }]))

  return (
    <View style={CONTAINER_STYLE}>
      <Animated.Image
        source={source}
        resizeMode={'contain'}
        style={IMAGE_STYLE}
      />
      {!loaded &&
        <Animated.View style={PLACEHOLDER_STYLE} />}
    </View>
  )
}
