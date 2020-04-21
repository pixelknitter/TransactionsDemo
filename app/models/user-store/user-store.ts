import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { GetUserResult } from "./../../services/api"
import { UserModel, UserSnapshot } from "../user"
import { withEnvironment } from "../extensions"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    currentUser: types.optional(UserModel, {}),
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    /**
     * Populate the current user
     */
    saveCurrentUser: (userSnapshot: UserSnapshot) => {
      self.currentUser = UserModel.create(userSnapshot)
    },
  }))
  .actions(self => ({
    getUser: flow(function * () {
      const result: GetUserResult = yield self.environment.api.getUser()

      if (result.kind === "ok") {
        self.saveCurrentUser(result.user)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
