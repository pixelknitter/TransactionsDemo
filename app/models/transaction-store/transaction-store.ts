import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { TransactionModel, TransactionSnapshot, Transaction } from "../transaction"
import type { GetUserResult } from "../../services/api"
import { withEnvironment } from "../extensions"
import { withRootStore } from "../extensions/with-root-store"
import { compareDesc } from "date-fns"

export type SectionedTransactions = { title: string; data: Transaction[] }

/**
 * Storage for the list of transactions by userId and relevant actions
 */
export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    associatedUserId: types.optional(types.string, "-1"),
    transactions: types.optional(types.array(TransactionModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions(self => ({
    /**
     * Save a collection of transactions to a user
     */
    saveTransactions: (transactionSnapshots: TransactionSnapshot[], associatedUserId: string) => {
      // TODO: add additional support for pagination
      // Set the associated User ID if it's default
      if (self.associatedUserId === "-1") {
        self.associatedUserId = associatedUserId
      }
      // Map the snapshot to the transactions list
      const transactionModels: Transaction[] = transactionSnapshots.map(transaction => {
        const { currentUser, updateBalance } = self.rootStore.userStore
        // make sure the user IDs match, then update the balance
        if (currentUser.id === associatedUserId) {
          updateBalance(transaction)
        }
        return TransactionModel.create(transaction)
      })
      self.transactions.replace(transactionModels)
    },
    /**
     * Save an individual transaction to a user
     */
    saveTransaction: (
      transactionSnapshot: TransactionSnapshot | Transaction,
      associatedUserId: string,
    ) => {
      const { currentUser, updateBalance } = self.rootStore.userStore

      // Set the associated User ID if it's default
      if (self.associatedUserId === "-1") {
        self.associatedUserId = associatedUserId
      }

      // make sure the user IDs match, then update the balance
      if (currentUser.id === associatedUserId) {
        updateBalance(transactionSnapshot)
      }

      self.transactions.push(TransactionModel.create(transactionSnapshot))
    },
    /**
     * Resets the store
     */
    reset: () => {
      self.associatedUserId = "-1"
      self.transactions.clear()
    },
  }))
  .actions(self => ({
    /**
     * Get transactions from the user endpoint
     */
    getTransactions: flow(function*() {
      const result: GetUserResult = yield self.environment.api.getUser()

      if (result.kind === "ok") {
        const { user, transactions } = result
        self.saveTransactions(transactions, user.id)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))
  .views(self => ({
    /**
     * Returns a descending ordered sectional array of transactions by year (useful for SectionLists)
     */
    formatForSectionsByYear: (): SectionedTransactions[] => {
      // pre-sort for simpler insertion
      const sortedData = self.transactions.sort((a, b) => compareDesc(a.date, b.date))

      // organize the data into years
      const yearMap = {}
      sortedData.forEach(item => {
        const itemYear = item.date.getFullYear().toString()

        // check to see if the year already exists in the map
        // if not create one, otherwise add to the year
        if (!yearMap[itemYear]) {
          yearMap[itemYear] = [item]
        } else {
          yearMap[itemYear].push(item)
        }
      })

      // map the year and data to expected format of SectionedTransactions
      return (
        Object.keys(yearMap)
          // create the sectional objects
          .map(year => ({ title: year, data: yearMap[year] }))
          // make sure the most recent year is first (descending order)
          .sort((a, b) => (a.title < b.title ? 1 : a.title === b.title ? 0 : -1))
      )
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TransactionStoreType = Instance<typeof TransactionStoreModel>
export interface TransactionStore extends TransactionStoreType {}
type TransactionStoreSnapshotType = SnapshotOut<typeof TransactionStoreModel>
export interface TransactionStoreSnapshot extends TransactionStoreSnapshotType {}
