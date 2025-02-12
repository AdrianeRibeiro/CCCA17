import API from "./API"
import GetAccount from "./GetAccount"
import { AccountRepositoryDatabase } from "./AccountRepository"
import Signup from "./Signup"
import { PgPromiseAdapter } from "./DatabaseConnection";

const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection)
const signup = new Signup(accountRepository)
const getAccount = new GetAccount(accountRepository)
const api = new API(signup, getAccount)
api.build()
api.start()