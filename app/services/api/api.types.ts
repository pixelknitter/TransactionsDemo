import { GeneralApiProblem } from "./api-problem"
import { UserSnapshot } from "../../models/user/"

// mocks an api response for a user object
export type GetUserResult = { kind: "ok"; user: UserSnapshot } | GeneralApiProblem
