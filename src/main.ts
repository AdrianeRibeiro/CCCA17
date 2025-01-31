import API from "./driver"
import GetAccount from "./GetAccount"
import { AccountDAODatabase } from "./resource"
import Signup from "./Signup"

const accountDAO = new AccountDAODatabase()
const signup = new Signup(accountDAO)
const getAccount = new GetAccount(accountDAO)
const api = new API(signup, getAccount)
api.build()
api.start()