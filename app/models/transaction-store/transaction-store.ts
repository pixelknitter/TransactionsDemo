import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { TransactionModel, TransactionSnapshot, Transaction } from "../transaction"
import { GetUserResult } from '../../services/api'
import { withEnvironment } from '../extensions'

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
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveTransactions: (transactionSnapshots: TransactionSnapshot[], associatedUserId?: string) => {
      // Set the associated User ID if it didn't exist
      if (associatedUserId) {
        self.associatedUserId = associatedUserId
      }
      // Map the snapshot to the transactions list
      const transactionModels: Transaction[] = transactionSnapshots.map(c => TransactionModel.create(c))
      self.transactions.replace(transactionModels)
    },
  }))
  .actions(self => ({
    getTransactions: flow(function * () {
      const result: GetUserResult = yield self.environment.api.getUser()

      if (result.kind === "ok") {
        const { user } = result
        self.saveTransactions(user.transactions, user.id)
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
