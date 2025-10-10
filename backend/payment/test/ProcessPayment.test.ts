import GetTransaction from "../src/application/usecase/payment/GetTransaction"
import ProcessPayment from "../src/application/usecase/payment/ProcessPayment"
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import CieloGateway from "../src/infra/gateway/CieloGateway"
import PJBankGateway from "../src/infra/gateway/PJBankGateway"
import ORM from "../src/infra/orm/ORM"
import TransactionRepositoryORM from "../src/infra/repository/TransactionRepositoryORM"
import crypto from "crypto"

test("Deve processar a transação de pagamento", async () => {
  const connection = new PgPromiseAdapter()
  const orm = new ORM(connection)
  const transactionRepository = new TransactionRepositoryORM(orm)

  const processPayment = new ProcessPayment(transactionRepository, new PJBankGateway(), new CieloGateway())
  const outputProcessPayment = await processPayment.execute({ rideId: crypto.randomUUID(), amount: 100 })

  const getTransaction = new GetTransaction(transactionRepository)
  const outputGetTransaction = await getTransaction.execute(outputProcessPayment.transactionId)

  expect(outputGetTransaction.transactionId).toBe(outputProcessPayment.transactionId)
  expect(outputGetTransaction.status).toBe("approved")
  expect(outputGetTransaction.amount).toBe(100)

  await connection.close()
})