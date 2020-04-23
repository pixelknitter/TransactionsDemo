import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { UserHeader } from "./user-header"
import { v1 as uuid } from 'uuid'
import { UserSnapshot } from "../../models/user"

declare let module

const mockUser: UserSnapshot = {
  id: uuid(),
  name: 'Simon Garfunkle',
  balance: 1202,
  avatar: 'http://www.fillmurray.com/200/200'
}

storiesOf("UserHeader", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="Displays the avatar, name, and current balance of the user.">
        <UserHeader user={mockUser} />
      </UseCase>
    </Story>
  ))
