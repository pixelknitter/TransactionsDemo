import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AsyncImage } from "./async-image"
import { color } from "../../theme"

declare let module

storiesOf("AsyncImage", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="Provide a source and placeholder color, this will load the image asynchronously with an animation.">
        <AsyncImage
          source={{ uri: 'http://www.fillmurray.com/200/200' }}
          placeholderColor={color.palette.tealBlue}
        />
      </UseCase>
    </Story>
  ))
