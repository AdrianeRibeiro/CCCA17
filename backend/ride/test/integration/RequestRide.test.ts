import GetRide from "../../src/application/usecase/ride/GetRide";
import RequestRide from "../../src/application/usecase/ride/RequestRide";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttp";
import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

let connection: DatabaseConnection
let requestRide: RequestRide
let getRide: GetRide
let accountGateway: AccountGatewayHttp

beforeEach(function () {
  connection = new PgPromiseAdapter();
  const rideRepository = new RideRepositoryDatabase(connection);
  const positionRepository = new PositionRepositoryDatabase(connection);
  accountGateway = new AccountGatewayHttp()
  requestRide = new RequestRide(rideRepository, accountGateway)
  getRide = new GetRide(rideRepository, accountGateway, positionRepository)
})

test("Deve solicitar uma corrida", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  const outputSignup = await accountGateway.signup(input)

  const inputRequestRide = {
    passengerId: outputSignup.accountId,
    fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
  }
  const outputRequestRide = await requestRide.execute(inputRequestRide)
  expect(outputRequestRide.rideId).toBeDefined()

  const outputGetRide = await getRide.execute(outputRequestRide.rideId)
  expect(outputGetRide).toMatchObject({
    rideId: outputRequestRide.rideId,
    passengerId: inputRequestRide.passengerId,
    fromLat: inputRequestRide.fromLat,
		fromLong: inputRequestRide.fromLong,
		toLat: inputRequestRide.toLat,
		toLong: inputRequestRide.toLong,
    status: "requested"
  });
})

test("Não deve poder solicitar uma corrida se a conta não for de um passageiro", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    carPlate: "ABC9999",
    isPassenger: false,
    isDriver: true
  }
  const outputSignup = await accountGateway.signup(input)

  const inputRequestRide = {
    passengerId: outputSignup.accountId,
    fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
  }
  await expect(() => requestRide.execute(inputRequestRide)).rejects.toThrow(new Error("Account is not a passenger"))
 
})

test("Não deve poder solicitar uma corrida se o passageiro já tiver uma corrida não finalizada", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  const outputSignup = await accountGateway.signup(input)

  const inputRequestRide = {
    passengerId: outputSignup.accountId,
    fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
  }
  await requestRide.execute(inputRequestRide)
  await expect(() => requestRide.execute(inputRequestRide)).rejects.toThrow(new Error("This passenger has an active ride"))
})

afterEach(async () => {
  await connection.close()
})