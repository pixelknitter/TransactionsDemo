import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { TransactionModel, TransactionSnapshot, Transaction } from "../transaction"
import { GetUserResult } from '../../services/api'
import { withEnvironment } from '../extensions'
import { withRootStore } from '../extensions/with-root-store'

/**
 * Model description here for TypeScript hints.
 */
export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    associatedUserId: types.optional(types.string, "-1"),
    transactions: types.optional(types.array(TransactionModel), [])
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    /**
     * Save a collection of transactions to a user
     */
    saveTransactions: (transactionSnapshots: TransactionSnapshot[], associatedUserId: string) => {
      // TODO: add additional support for pagination
      // Set the associated User ID if it doesn't exist
      if (!self.associatedUserId) {
        self.associatedUserId = associatedUserId
      }
      // Map the snapshot to the transactions list
      const transactionModels: Transaction[] = transactionSnapshots.map(c => {
        const currentUser = self.rootStore.userStore.currentUser
        // make sure the user IDs match, then update the balance
        if (currentUser.id === associatedUserId) {
          currentUser.updateBalance(c)
        }
        // TODO: look into sorting here
        return TransactionModel.create(c)
      })
      self.transactions.replace(transactionModels)
    },
    /**
     * Save an individual transaction to a user
     */
    saveTransaction: (transactionSnapshot: TransactionSnapshot | Transaction, associatedUserId: string) => {
      const currentUser = self.rootStore.userStore.currentUser

      // Set the associated User ID if it doesn't exist
      if (!self.associatedUserId) {
        self.associatedUserId = associatedUserId
      }

      // make sure the user IDs match, then update the balance
      if (currentUser.id === associatedUserId) {
        currentUser.updateBalance(transactionSnapshot)
      }
      // TODO: insert into appropriate sort by DATE
      self.transactions.concat(TransactionModel.create(transactionSnapshot))
    },
  }))
  .actions(self => ({
    getTransactions: flow(function * () {
      const result: GetUserResult = yield self.environment.api.getUser()

      if (result.kind === "ok") {
        const { user, transactions } = result
        self.saveTransactions(transactions, user.id)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
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
