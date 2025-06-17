import AcceptRide from "../../src/application/usecase/ride/AcceptRide";
import GetRide from "../../src/application/usecase/ride/GetRide";
import RequestRide from "../../src/application/usecase/ride/RequestRide";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttp";
import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

let connection: DatabaseConnection
let requestRide: RequestRide
let getRide: GetRide
let acceptRide: AcceptRide
let accountGateway: AccountGatewayHttp

beforeEach(function () {
  connection = new PgPromiseAdapter();
  accountGateway = new AccountGatewayHttp()
  const rideRepository = new RideRepositoryDatabase(connection);
  requestRide = new RequestRide(rideRepository, accountGateway)
  const positionRepository = new PositionRepositoryDatabase(connection);
  getRide = new GetRide(rideRepository, accountGateway, positionRepository)
  acceptRide = new AcceptRide(rideRepository, accountGateway)
})

test("Deve aceitar uma corrida", async function () {
  const inputSignupPassenger = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  const outputSignupPassenger = await accountGateway.signup(inputSignupPassenger)

  const inputRequestRide = {
    passengerId: outputSignupPassenger.accountId,
    fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
  }
  const outputRequestRide = await requestRide.execute(inputRequestRide)

  const inputSignupDriver = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    carPlate: "AAA9999",
    isDriver: true
  }
  const outputSignupDriver = await accountGateway.signup(inputSignupDriver)
  const inputAcceptRide = {
    rideId: outputRequestRide.rideId,
    driverId: outputSignupDriver.accountId
  }

  await acceptRide.execute(inputAcceptRide)

  const outputGetRide = await getRide.execute(outputRequestRide.rideId)
  expect(outputGetRide).toMatchObject({
    status: "accepted",
    driverId: outputSignupDriver.accountId
  });
})

test("Não deve aceitar uma corrida se o motorista já tiver outra corrida", async function () {
  const inputSignupPassenger = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  const outputSignupPassenger = await accountGateway.signup(inputSignupPassenger)

  const inputRequestRide = {
    passengerId: outputSignupPassenger.accountId,
    fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
  }
  const outputRequestRide = await requestRide.execute(inputRequestRide)

  const inputSignupDriver = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    carPlate: "AAA9999",
    isDriver: true
  }
  const outputSignupDriver = await accountGateway.signup(inputSignupDriver)
  const inputAcceptRide = {
    rideId: outputRequestRide.rideId,
    driverId: outputSignupDriver.accountId
  }

  await acceptRide.execute(inputAcceptRide)

  await expect(() => acceptRide.execute(inputAcceptRide)).rejects.toThrow(new Error("This driver has an active ride"))
})

afterEach(async () => {
  await connection.close()
})