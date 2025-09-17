import API from "./infra/controller/AccountController"
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository"
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import Signup from "./application/usecase/account/Signup";
import GetAccount from "./application/usecase/account/GetAccount";
import Registry from "./infra/di/Registry";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/controller/QueueController";

(async () => {
    const connection = new PgPromiseAdapter();
    const accountRepository = new AccountRepositoryDatabase(connection)
    const signup = new Signup(accountRepository)
    const getAccount = new GetAccount(accountRepository)

    const httpServer = new ExpressAdapter()
    /* injeção de dependência
    new AccountController(httpServer, signup, getAccount)
    */

    const queue = new RabbitMQAdapter()
    await queue.connect()
    await queue.setup("signup", "signup");

    Registry.getInstance().provide("signup", signup)
    Registry.getInstance().provide("getAccount", getAccount)
    Registry.getInstance().provide("queue", queue)

    new AccountController(httpServer)
    new QueueController()
    
    httpServer.listen(3001)  
})()
