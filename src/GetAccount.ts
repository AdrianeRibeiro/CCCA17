import AccountDAO from "./resource"
import UseCase from "./UseCase"

export default class GetAccount implements UseCase {
  accountDAO: AccountDAO

  constructor(accountDAO: AccountDAO) {
    this.accountDAO = accountDAO
  }
  
  async execute(accountId: any): Promise<any> {
   const account = await this.accountDAO.getAccountById(accountId)
   return account
  }  
}
