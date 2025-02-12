import pgp from "pg-promise"
import Account from "./Account"

// AccountRepository é um padrão de persistência de objetos de domínio
export default interface AccountRepository {
  getAccountByEmail (email: string): Promise<Account | undefined>
  getAccountById (accountId: string): Promise<Account>
  saveAccount (account: Account): Promise<void>
}

// Padrão DAO: Data Access Object - estamos lidando com a mesma tabela. Esse padrão expõe operações da mesma tabela
// Repository implica em objeto de domínio
export class AccountRepositoryDatabase implements AccountRepository {
  private URL_CONNECTION = "postgres://qqwztrsw:uzfxPCdWpb82K7J2O84VGVg5_lu12ibp@kesavan.db.elephantsql.com/qqwztrsw"

  async getAccountByEmail (email: string): Promise<Account | undefined> {
    const connection = pgp()(this.URL_CONNECTION)
    const [accountData] = await connection.query("select * from cccat17.account where email = $1", [email])
    await connection.$pool.end()

    if (!accountData) return

    return new Account(accountData.account_id, accountData.name, accountData.email, accountData.cpf, accountData.car_plate, accountData.is_passenger, accountData.is_driver)
  }
  
  async getAccountById (accountId: string) {
    const connection = pgp()(this.URL_CONNECTION)
    const [accountData] = await connection.query("select * from cccat17.account where account_id = $1", [accountId])
    await connection.$pool.end()

    if(!accountData) throw new Error("Account not found")

    return new Account(accountData.account_id, accountData.name, accountData.email, accountData.cpf, accountData.car_plate, accountData.is_passenger, accountData.is_driver)
  }
  
  async saveAccount (account: Account) {
    const connection = pgp()(this.URL_CONNECTION)
    await connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [account.accountId, account.name, account.email, account.getCpf(), account.carPlate, !!account.isPassenger, !!account.isDriver])
    await connection.$pool.end();
  }
}


export class AccountRepositoryMemory implements AccountRepository {
  accounts: Account[]

  constructor () {
    this.accounts = []
  }

  async getAccountByEmail (email: string): Promise<any> {
    return this.accounts.find((account: Account) => account.email === email)
  }
  
  async getAccountById (accountId: string): Promise<any>  {
    return this.accounts.find((account: Account) => account.accountId === accountId)
  }
  
  async saveAccount (account: Account): Promise<void>  {
    this.accounts.push(account)
  }
}