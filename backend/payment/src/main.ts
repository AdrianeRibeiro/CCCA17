import { ExpressAdapter } from "./infra/http/HttpServer";
import ProcessPayment from "./application/usecase/payment/ProcessPayment";
import PaymentController from "./infra/controller/PaymentController";

const httpServer = new ExpressAdapter()
const processPayment = new ProcessPayment()
new PaymentController(httpServer, processPayment)

httpServer.listen(3002)