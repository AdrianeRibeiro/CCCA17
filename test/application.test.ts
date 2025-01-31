import sinon from "sinon"
import MailerGateway from "../src/MailerGateway"
import { AccountDAODatabase, AccountDAOMemory } from "../src/resource"
import Signup from "../src/Signup"
import GetAccount from "../src/GetAccount"

let signup: Signup
let getAccount: GetAccount

beforeEach(function () {
  const accountDAO = new AccountDAODatabase();
	signup = new Signup(accountDAO)
  getAccount = new GetAccount(accountDAO)
})

test("Deve criar uma conta para o passageiro", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)
})

test("Não deve criar uma conta de passageiro com nome inválido", async function () {
  const input = {
    name: "",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  expect(() => signup.execute(input)).rejects.toThrowError("Invalid name")
})

test("Não deve criar uma conta de passageiro com email inválido", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}`,
    cpf: "97456321558",
    isPassenger: true
  }
  expect(() => signup.execute(input)).rejects.toThrowError("Invalid email")
})

test("Não deve criar uma conta de passageiro com cpf inválido", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558123",
    isPassenger: true
  }
  expect(() => signup.execute(input)).rejects.toThrowError("Invalid cpf")
})

test("Não deve criar uma conta de passageiro com email duplicado", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  await signup.execute(input)
  expect(() => signup.execute(input)).rejects.toThrowError("Account already exists")
})

test("Deve criar uma conta de motorista", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    carPlate: "ABC1234",
    isDriver: true
  }
  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)
  expect(outputGetAccount.car_plate).toBe(input.carPlate)
})

test("Não deve criar uma conta de motorista com a placa inválida", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    carPlate: "ABC123",
    isDriver: true
  }
  expect(() => signup.execute(input)).rejects.toThrowError("Invalid car plate")
})

test("Deve criar uma conta de passageiro com stub do MailerGateway", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }

  const stub = sinon.stub(MailerGateway.prototype, "send").resolves()
  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)

  stub.restore()
})

test("Deve criar uma conta de passageiro com stub do AccountDAO", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }

  const stubSaveAccount = sinon.stub(AccountDAODatabase.prototype, "saveAccount").resolves()
  const stubGetAccountByEmail = sinon.stub(AccountDAODatabase.prototype, "getAccountByEmail").resolves(undefined)
  const stubGetAccountById = sinon.stub(AccountDAODatabase.prototype, "getAccountById").resolves(input)

  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)

  stubSaveAccount.restore()
  stubGetAccountByEmail.restore()
  stubGetAccountById.restore()
})

test("Deve criar uma conta de passageiro com fake do AccountDAO", async function () {
  const accountDAO = new AccountDAOMemory()
  signup = new Signup(accountDAO)
  getAccount = new GetAccount(accountDAO)
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }

  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)
})

test("Deve criar uma conta de passageiro com spy no MailerGateway", async function () {
  const spySend = sinon.spy(MailerGateway.prototype, "send")
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }

  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)

  expect(spySend.calledOnce).toBe(true)
  expect(spySend.calledWith(input.email, "Welcome!", "")).toBe(true)

  spySend.restore()
})

test("Deve criar uma conta com mock no MailerGateway", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }

  const mockMailerGateway = sinon.mock(MailerGateway.prototype)
  mockMailerGateway.expects("send").once().withArgs(input.email, "Welcome!", "").once()

  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)

  mockMailerGateway.verify()
})
