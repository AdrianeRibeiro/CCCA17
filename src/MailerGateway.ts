export default class MailerGateway {
  async send (email: string, subject: string, message: string) {
    console.log(`Sending email to ${email}: ${message}`)
  }
}