
import { ApisauceInstance } from "apisauce"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { UserSnapshot } from "../../models/user"
import { TransactionSnapshot } from "./../../models/transaction"
import { v1 as uuid } from "uuid"
import { parse } from "date-fns"
import initialDataJSON from "./initial-data.json"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance - WE DON'T NEED THIS FOR NOW
    // this.apisauce = create({
    //   baseURL: this.config.url,
    //   timeout: this.config.timeout,
    //   headers: {
    //     Accept: "application/json",
    //   },
    // })
  }

  /**
   * Gets a single mock user
   */
  async getUser(): Promise<Types.GetUserResult> {
    // const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)
    // make the *mock* api call
    const response = initialDataJSON

    // the typical ways to die when calling an api
    // if (!response.ok) {
    //   const problem = getGeneralApiProblem(response)
    //   if (problem) return problem
    // }
    __DEV__ && console.tron.log(response)
    // transform the data into the format we are expecting
    try {
      const resultUser: UserSnapshot = this.convertUser(response)
      __DEV__ && console.tron.log(resultUser)
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Converts an object into an MST acceptable TransactionSnapshot
   * @param raw - the object to convert into a transaction
   */
  convertTransaction = (raw: any): TransactionSnapshot => {
    return {
      id: uuid(),
      date: parse(raw.date, 'yyyy-MM-dd', new Date()).getTime(),
      merchant: raw.merchant,
      amount: raw.amount,
      type: raw.type,
      details: (raw.details !== undefined) ? raw.details : "",
    }
  }

  /**
   * Converts an object into an MST acceptable UserSnapshot
   * @param raw - the object to convert into a user
   */
  convertUser = (raw: any): UserSnapshot => {
    return {
      id: uuid(),
      name: raw.name,
      avatar: raw.avatar,
      balance: raw.balance,
      transactions: raw.transactions.map(this.convertTransaction)
    }
  }
}
