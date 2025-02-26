import API from "./AccountController"
import GetAccount from "./application/usecase/GetAccount"
import { AccountRepositoryDatabase } from "./AccountRepository"
import Signup from "./application/usecase/Signup"
import { PgPromiseAdapter } from "./DatabaseConnection";
import { ExpressAdapter } from "./HttpServer";
import AccountController from "./AccountController";

const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection)
const signup = new Signup(accountRepository)
const getAccount = new GetAccount(accountRepository)
const httpServer = new ExpressAdapter()
new AccountController(httpServer, signup, getAccount)

httpServer.listen(3000)