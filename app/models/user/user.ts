import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TransactionModel, Transaction } from "../transaction"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.optional(types.identifier, "-1"),
    name: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    balance: types.maybeNull(types.number),
    transactions: types.optional(types.array(TransactionModel), [])
  })
  .actions(self => ({
    updateBalance: (transaction: Transaction) => {
      const value = transaction.amount
      switch (transaction.type) {
        case "credit":
          self.balance += value
          break
        case "debit":
          self.balance -= value
          break
      }
    }
  }))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .views(self => ({}))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
