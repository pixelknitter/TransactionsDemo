import { UserStoreModel, UserStore } from "./user-store"
import { UserModel } from "../user"
import { v1 as uuid } from "uuid"

test("can be created", () => {
  const instance: UserStore = UserStoreModel.create()

  expect(instance).toBeTruthy()
})

test("has correct defaults", () => {
  const instance: UserStore = UserStoreModel.create()

  expect(instance.currentUser).toEqual(UserModel.create({}))
})

test("can save current user", () => {
  const instance: UserStore = UserStoreModel.create({} as any)
  instance.saveCurrentUser({
    id: uuid(),
    name: "Eddie Freeman",
    avatar: "http://www.fillmurray.com/200/200",
    balance: 111,
    transactions: []
  })

  expect(instance.currentUser.id).toBeDefined()
  expect(instance.currentUser.name).toEqual("Eddie Freeman")
  expect(instance.currentUser.avatar).toBeDefined()
  expect(instance.currentUser.balance).toEqual(111)
  expect(instance.currentUser.transactions).toHaveLength(0)
})
