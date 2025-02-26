import MailerGatewayFake from "../../infra/gateway/MailerGatewayFake"
import UseCase from "../../UseCase"
import Account from "../../domain/Account"
import MailerGateway from "../gateway/MailerGateway"
import AccountRepository from "../repository/AccountRepository"

export default class Signup implements UseCase{
  accountRepository: AccountRepository
  mailerGateway: MailerGateway

  constructor(accountRepository: AccountRepository, mailerGateway: MailerGateway = new MailerGatewayFake()) {
    this.accountRepository = accountRepository
    this.mailerGateway = mailerGateway
  }

  async execute(input: any): Promise<any> {
    const existingAccount = await this.accountRepository.getAccountByEmail(input.email)
    if (existingAccount) throw new Error("Account already exists")
    
    const account = Account.create(input.name, input.email, input.cpf, input.carPlate, input.isPassenger, input.isDriver)
    await this.accountRepository.saveAccount(account)
    await this.mailerGateway.send(account.email, "Welcome!", "")
    return { accountId: account.accountId }
  }  
}
