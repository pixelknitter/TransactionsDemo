import { TransactionStoreModel, TransactionStore } from "./transaction-store"
import { TransactionSnapshot, TransactionModel } from "./../transaction"
import { UserSnapshot } from "../user"
import { v1 as uuid } from "uuid"
import { parse } from "date-fns"
import { UserStoreModel } from "../user-store"
import { RootStore, RootStoreModel } from "../root-store"

describe("TransactionStore", () => {
  describe("smoke tests", () => {
    let model: TransactionStore
    let rootStore: RootStore

    beforeEach(() => {
      rootStore = RootStoreModel.create({})
      model = rootStore.transactionStore
    })

    test("can be created", () => {
      expect(model).toBeTruthy()
    })

    test('has correct defaults', () => {
      expect(model.associatedUserId).toEqual("-1")
      expect(model.transactions).toHaveLength(0)
    })

    test("resets properly", async (done) => {
      const transaction = TransactionModel.create({
        id: uuid(),
        merchant: "Feel Good Inc",
        date: parse("2019-01-15", "yyyy-MM-dd", new Date()).getTime(),
        amount: 1200,
        type: "debit",
        details: ""
      })
      model.saveTransaction(transaction)

      await model.reset()

      expect(model).toEqual(TransactionStoreModel.create())
      done()
    })
  })
  describe("action tests", () => {
    describe("manipulating transactions", () => {
      let model: TransactionStore
      let rootStore: RootStore
      let transaction: TransactionSnapshot
      let transactions: TransactionSnapshot[]

      beforeEach(() => {
        // create some mock transactions
        transaction = {
          id: uuid(),
          merchant: "Feel Good Inc",
          date: parse("2019-01-15", "yyyy-MM-dd", new Date()).getTime(),
          amount: 1200,
          type: "debit",
          details: ""
        }
        transactions = [
          {
            id: uuid(),
            merchant: "Till, Inc.",
            date: new Date().getTime(),
            amount: 1000000,
            type: "credit",
            details: ""
          },
          transaction
        ]
        // create a mock user
        const user: UserSnapshot = {
          id: "1234",
          name: "Eddie Freeman",
          avatar: "http://www.fillmurray.com/200/200",
          balance: 1121,
        }
        // configure the stores
        const userStore = UserStoreModel.create({ user })
        // for use with other actions that may not need an empty one
        const transactionStore = TransactionStoreModel.create({ transactions })
        rootStore = RootStoreModel.create({ transactionStore, userStore })
        model = rootStore.transactionStore
      })

      test("can save a list of transactions", () => {
        model.saveTransactions(transactions, "1234")

        expect(model.associatedUserId).toEqual("1234")
        expect(model.transactions).toHaveLength(2)
      })

      test("can save a transaction", () => {
        model.saveTransaction(transaction, "1234")

        expect(model.associatedUserId).toEqual("1234")
        expect(model.transactions).toHaveLength(3)
      })

      test("can format transactions into sections by year", () => {
        const SectionalTransactions = model.formatForSectionsByYear()

        expect(SectionalTransactions).toHaveLength(2)
        expect(SectionalTransactions[1].title).toEqual("2019")
        expect(SectionalTransactions[0].data).toHaveLength(1)
        expect(SectionalTransactions[1].data).toHaveLength(1)
      })
    })
  })
})
