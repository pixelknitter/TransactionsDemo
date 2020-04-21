import { UserModel, User } from "./user"
import { v1 as uuid } from "uuid"

test("can be created", () => {
  const instance: User = UserModel.create({
    id: uuid(),
    name: "Eddie Freeman"
  })

  expect(instance).toBeTruthy()
})

test("has correct defaults", () => {
  const instance: User = UserModel.create({})

  expect(instance.id).toEqual("-1")
  expect(instance.name).toBeNull()
  expect(instance.avatar).toBeNull()
  expect(instance.balance).toBeNull()
  expect(instance.transactions).toHaveLength(0)
})
