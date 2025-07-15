import axios from "axios"

axios.defaults.validateStatus = function () {
  return true
}

test("Deve criar uma conta para o passageiro", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
    password: "123456"
  }
  const responseSignup = await axios.post("http://localhost:3001/signup", input)
  const outputSignup = responseSignup.data
  expect(outputSignup.accountId).toBeDefined()

  const responseGetAccount = await axios.get(`http://localhost:3001/accounts/${outputSignup.accountId}`)
  const outputGetAccount = responseGetAccount.data
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)
  expect(outputGetAccount.password).toBe(input.password)

})