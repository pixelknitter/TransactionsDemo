import { v1 as uuid } from "uuid"
import { TransactionModel, Transaction } from "./transaction"

describe("Transaction", () => {
  describe("smoke tests", () => {
    test("can be created", () => {
      const instance: Transaction = TransactionModel.create({
        id: uuid(),
        merchant: "Till, Inc.",
        date: new Date(),
        amount: 1000000,
        type: "credit",
      })

      expect(instance).toBeTruthy()
    })

    test("has correct defaults", () => {
      const instance: Transaction = TransactionModel.create({})

      expect(instance.id).toEqual("-1")
      expect(instance.date).toBeNull()
      expect(instance.merchant).toBeNull()
      expect(instance.amount).toBeNull()
      expect(instance.type).toBeNull()
      expect(instance.details).toBeNull()
    })
  })
})
