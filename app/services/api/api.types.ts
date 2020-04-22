import { GeneralApiProblem } from "./api-problem"
import { UserSnapshot } from "../../models/user/"
import { TransactionSnapshot } from "../../models/transaction"

// mocks an api response for a user object
export type GetUserResult = { kind: "ok"; user: UserSnapshot; transactions: TransactionSnapshot[] } | GeneralApiProblem
