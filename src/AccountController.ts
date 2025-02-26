import Signup from "./application/usecase/Signup";
import GetAccount from "./application/usecase/GetAccount";
import HttpServer from "./HttpServer";

export default class AccountController {
  app: any

  constructor(
    readonly httpServer: HttpServer, 
    readonly signup: Signup, 
    readonly getAccount: GetAccount
  ) {
    this.build()
  }
  
  private build() {
    this.httpServer.register("post", "/signup", async (params: any, body: any) => {
			const input = body
      const output = await this.signup.execute(input)
			return output
		})
		
		this.httpServer.register("get", "/accounts/:{accountId}", async (params: any, body: any) => {
			const accountId = params.accountId
			const output = await this.getAccount.execute(accountId)
			return output
		})
  }
}