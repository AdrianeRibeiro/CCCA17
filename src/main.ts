import API from "./infra/controller/AccountController"
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository"
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import Signup from "./application/usecase/account/Signup";
import GetAccount from "./application/usecase/account/GetAccount";

const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection)
const signup = new Signup(accountRepository)
const getAccount = new GetAccount(accountRepository)
const httpServer = new ExpressAdapter()
new AccountController(httpServer, signup, getAccount)

httpServer.listen(3000)