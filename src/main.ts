import API from "./driver"
import GetAccount from "./GetAccount"
import { AccountRepositoryDatabase } from "./AccountRepository"
import Signup from "./Signup"

const accountRepository = new AccountRepositoryDatabase()
const signup = new Signup(accountRepository)
const getAccount = new GetAccount(accountRepository)
const api = new API(signup, getAccount)
api.build()
api.start()