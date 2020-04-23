import { Instance, SnapshotOut, types } from "mobx-state-tree"

export type LineType = "debit" | "credit"

/**
 * A transaction with date, merchant, amount, type, and any details associated.
 */
export const TransactionModel = types
  .model("Transaction")
  .props({
    id: types.optional(types.identifier, "-1"),
    date: types.maybeNull(types.Date),
    merchant: types.maybeNull(types.string),
    amount: types.maybeNull(types.number),
    type: types.maybeNull(types.enumeration(["credit", "debit"])),
    details: types.maybeNull(types.string)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TransactionType = Instance<typeof TransactionModel>
export interface Transaction extends TransactionType {}
type TransactionSnapshotType = SnapshotOut<typeof TransactionModel>
export interface TransactionSnapshot extends TransactionSnapshotType {}
