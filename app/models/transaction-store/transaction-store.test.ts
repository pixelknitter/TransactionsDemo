import { TransactionStoreModel, TransactionStore } from "./transaction-store"

test("can be created", () => {
  const instance: TransactionStore = TransactionStoreModel.create({} as any)

  expect(instance).toBeTruthy()
})
