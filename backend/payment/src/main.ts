import { ExpressAdapter } from "./infra/http/HttpServer";
import ProcessPayment from "./application/usecase/payment/ProcessPayment";
import PaymentController from "./infra/controller/PaymentController";
import { RabbitMQAdapter } from "./infra/queue/Queue";

(async () => {
  const httpServer = new ExpressAdapter()
  const processPayment = new ProcessPayment()
  new PaymentController(httpServer, processPayment)

  const queue = new RabbitMQAdapter()
  await queue.connect()

  queue.consume("rideCompleted.processPayment", async function (input: any) {
    await processPayment.execute(input)
  })

  httpServer.listen(3002)
})
