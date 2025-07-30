import { ExpressAdapter } from "./infra/http/HttpServer";
import ProcessPayment from "./application/usecase/payment/ProcessPayment";
import PaymentController from "./infra/controller/PaymentController";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/controller/QueueController";

(async () => {
  const httpServer = new ExpressAdapter()
  const processPayment = new ProcessPayment()
  new PaymentController(httpServer, processPayment)

  const queue = new RabbitMQAdapter()
  await queue.connect()

  new QueueController(queue, processPayment)

  httpServer.listen(3002)
})
