import { parse } from "date-fns"
import { v1 as uuid } from "uuid"
import { TransactionModel, Transaction } from "./transaction"

test("can be created", () => {
  const instance: Transaction = TransactionModel.create({
    id: uuid(),
    merchant: "Till, Inc.",
    date: parse("2019-01-15", "yyyy-MM-dd", new Date()),
    amount: 1000000,
    type: "credit",
  })

  expect(instance).toBeTruthy()
})
