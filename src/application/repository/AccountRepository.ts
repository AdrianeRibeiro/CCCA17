import Account from "../../domain/Account"

// AccountRepository é um padrão de persistência de objetos de domínio
export default interface AccountRepository {
  getAccountByEmail (email: string): Promise<Account | undefined>
  getAccountById (accountId: string): Promise<Account>
  saveAccount (account: Account): Promise<void>
}