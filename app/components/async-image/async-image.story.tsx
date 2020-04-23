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
      <UseCase text="Primary" usage="The primary.">
        <AsyncImage
          source={{ uri: '' }}
          placeholderColor={color.palette.tealBlue}
        />
      </UseCase>
    </Story>
  ))
