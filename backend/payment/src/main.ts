import { ExpressAdapter } from "./infra/http/HttpServer";
import ProcessPayment from "./application/usecase/payment/ProcessPayment";
import PaymentController from "./infra/controller/PaymentController";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/controller/QueueController";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import ORM from "./infra/orm/ORM";
import TransactionRepositoryORM from "./infra/repository/TransactionRepositoryORM";
import PJBankGateway from "./infra/gateway/PJBankGateway";
import CieloGateway from "./infra/gateway/CieloGateway";

(async () => {
  const httpServer = new ExpressAdapter()

  const connection = new PgPromiseAdapter()
  const orm = new ORM(connection)
  const transactionRepository = new TransactionRepositoryORM(orm)
  const processPayment = new ProcessPayment(transactionRepository, new PJBankGateway(), new CieloGateway())
  new PaymentController(httpServer, processPayment)

  const queue = new RabbitMQAdapter()
  await queue.connect()

  new QueueController(queue, processPayment)

  httpServer.listen(3002)
})
