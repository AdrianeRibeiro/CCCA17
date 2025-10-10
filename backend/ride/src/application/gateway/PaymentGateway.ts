export default interface PaymentGateway {
  processPayment(input: any): Promise<Output>
}

//dto
type Output = {
  tid: string,
  authorizationCode: string,
  status: string
}