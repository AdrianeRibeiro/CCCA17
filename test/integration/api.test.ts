import sinon from "sinon"
import MailerGateway from "../../src/application/gateway/MailerGateway"
import { AccountRepositoryDatabase, AccountRepositoryMemory } from "../../src/infra/repository/AccountRepository"
import Signup from "../../src/application/usecase/Signup"
import GetAccount from "../../src/application/usecase/GetAccount"
import Account from "../../src/domain/Account"
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection"
import MailerGatewayFake from "../../src/infra/gateway/MailerGatewayFake"

let connection: DatabaseConnection
let signup: Signup
let getAccount: GetAccount
let mailerGateway: MailerGateway

beforeEach(function () {
  connection = new PgPromiseAdapter();
  const accountRepository = new AccountRepositoryDatabase(connection);
  mailerGateway = new MailerGatewayFake()
	signup = new Signup(accountRepository, mailerGateway)
  getAccount = new GetAccount(accountRepository)
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
  expect(outputGetAccount.carPlate).toBe(input.carPlate)
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

  const stub = sinon.stub(MailerGatewayFake.prototype, "send").resolves()
  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)

  stub.restore()
})

test("Deve criar uma conta de passageiro com stub do AccountRepository", async function () {
  const email = `john.doe${Math.random()}@gmail.com`
  const inputSignup = {
    name: "John Doe",
    email: email,
    cpf: "97456321558",
    isPassenger: true
  }

  const inputSignupStub = Account.create("John Doe", email, "97456321558", "", true, false)

  const stubSaveAccount = sinon.stub(AccountRepositoryDatabase.prototype, "saveAccount").resolves()
  const stubGetAccountByEmail = sinon.stub(AccountRepositoryDatabase.prototype, "getAccountByEmail").resolves(undefined)
  const stubGetAccountById = sinon.stub(AccountRepositoryDatabase.prototype, "getAccountById").resolves(inputSignupStub)

  const outputSignup = await signup.execute(inputSignup)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(inputSignup.name)
  expect(outputGetAccount.email).toBe(inputSignup.email)
  expect(outputGetAccount.cpf).toBe(inputSignup.cpf)

  stubSaveAccount.restore()
  stubGetAccountByEmail.restore()
  stubGetAccountById.restore()
})

test("Deve criar uma conta de passageiro com fake do AccountRepository", async function () {
  const accountRepository = new AccountRepositoryMemory()
  signup = new Signup(accountRepository)
  getAccount = new GetAccount(accountRepository)
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
  const spySend = sinon.spy(MailerGatewayFake.prototype, "send")
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

  const mockMailerGateway = sinon.mock(MailerGatewayFake.prototype)
  mockMailerGateway.expects("send").once().withArgs(input.email, "Welcome!", "").once()

  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined()
  const outputGetAccount = await getAccount.execute(outputSignup.accountId)
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)

  mockMailerGateway.verify()
})

afterEach(async () => {
  await connection.close()
})