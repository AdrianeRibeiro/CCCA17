import API from "./infra/controller/AccountController"
import GetAccount from "./application/usecase/GetAccount"
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository"
import Signup from "./application/usecase/Signup"
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";

const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection)
const signup = new Signup(accountRepository)
const getAccount = new GetAccount(accountRepository)
const httpServer = new ExpressAdapter()
new AccountController(httpServer, signup, getAccount)

httpServer.listen(3000)