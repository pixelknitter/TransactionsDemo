import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TransactionRow } from "./transaction-row"
import { Transaction } from '../../models/transaction'
import { v1 as uuid } from 'uuid'

declare let module

const mockTransaction: Transaction = {
  id: uuid(),
  date: new Date(),
  merchant: "Merchant",
  amount: 12.52,
  type: "debit",
  details: "some details that should be known?"
}

storiesOf("TransactionRow", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="Display the data of a Transaction with minimal usage of space. Visually represents the transaction type by use of (red) and green colors.">
        <TransactionRow transaction={mockTransaction} />
      </UseCase>
    </Story>
  ))
