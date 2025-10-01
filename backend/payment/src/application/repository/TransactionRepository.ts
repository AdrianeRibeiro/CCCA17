import Transaction from "../../domain/Transaction";

export default interface TransactionRepository {
  saveTransaction(transaction: Transaction): Promise<void>
  getTransactionsById(transactionId: string): Promise<Transaction>
}
