import { TransactionModel } from "./../transaction/transaction"
import { RootStore, RootStoreModel } from "../root-store"
import { UserStoreModel, UserStore } from "./user-store"
import { UserModel } from "../user"
import { v1 as uuid } from "uuid"

describe("UserStore", () => {
  describe("smoke tests", () => {
    let model: UserStore
    let rootStore: RootStore

    beforeEach(() => {
      rootStore = RootStoreModel.create({})
      model = rootStore.userStore
    })

    test("can be created", () => {
      expect(model).toBeTruthy()
    })

    test('has correct defaults', () => {
      expect(model.currentUser.id).toEqual("-1")
      expect(model.currentUser.name).toBeNull()
      expect(model.currentUser.avatar).toBeNull()
      expect(model.currentUser.balance).toBeNull()
    })

    test("resets properly", async (done) => {
      const user = UserModel.create({
        id: uuid(),
        name: "Eddie Freeman",
        avatar: "http://www.fillmurray.com/200/200",
        balance: 111,
      })

      model.saveCurrentUser(user)

      await model.reset()

      expect(model).toEqual(UserStoreModel.create())
      done()
    })
  })
  describe("action tests", () => {
    let model: UserStore
    let rootStore: RootStore

    beforeEach(() => {
      rootStore = RootStoreModel.create({})
      model = rootStore.userStore
    })

    test("can save current user", () => {
      const instance: UserStore = UserStoreModel.create({} as any)
      instance.saveCurrentUser({
        id: uuid(),
        name: "Eddie Freeman",
        avatar: "http://www.fillmurray.com/200/200",
        balance: 111,
      })

      expect(instance.currentUser.id).toBeDefined()
      expect(instance.currentUser.name).toEqual("Eddie Freeman")
      expect(instance.currentUser.avatar).toBeDefined()
      expect(instance.currentUser.balance).toEqual(111)
    })

    test("can update the balance", () => {
      const mockTransaction = TransactionModel.create({
        id: uuid(),
        merchant: "Till, Inc.",
        date: new Date(),
        amount: 1000000,
        type: "credit",
      })

      model.updateBalance(mockTransaction)

      expect(model.currentUser.balance).toEqual(1000000)
    })
  })
})

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
  })

  expect(instance.currentUser.id).toBeDefined()
  expect(instance.currentUser.name).toEqual("Eddie Freeman")
  expect(instance.currentUser.avatar).toBeDefined()
  expect(instance.currentUser.balance).toEqual(111)
})
