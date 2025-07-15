import amqp from "amqplib"

async function main() {
  const connection = await amqp.connect("amqp://localhost")
  const channel = await connection.createChannel()

  channel.consume("rideCompleted.processPayment", function(message: any) {
    console.log("[rideCompleted.processPayment]", message.content.toString())
    channel.ack(message)
  })

  channel.consume("rideCompleted.sendReceipt", function(message: any) {
    console.log("[rideCompleted.sendReceipt]", message.content.toString())
    channel.ack(message)
  })

  channel.consume("rideCompleted.generateInvoice", function(message: any) {
    console.log("[rideCompleted.generateInvoice]", message.content.toString())
    channel.ack(message)
  })
}

main()