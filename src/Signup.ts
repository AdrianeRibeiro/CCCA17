import AccountDAO from "./resource"
import MailerGateway from "./MailerGateway"
import UseCase from "./UseCase"
import Account from "./Account"

export default class Signup implements UseCase{
  accountDAO: AccountDAO
  mailerGateway: MailerGateway

  constructor(accountDAO: AccountDAO) {
    this.accountDAO = accountDAO
    this.mailerGateway = new MailerGateway()
  }

  async execute(input: any): Promise<any> {
    const existingAccount = await this.accountDAO.getAccountByEmail(input.email)
    if (existingAccount) throw new Error("Account already exists")
    
    const account = Account.create(input.name, input.email, input.cpf, input.carPlate, input.isPassenger, input.isDriver)
    await this.accountDAO.saveAccount(account)
    await this.mailerGateway.send(account.email, "Welcome!", "")
    return { accountId: account.accountId }
  }  
}
