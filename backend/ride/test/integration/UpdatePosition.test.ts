import AcceptRide from "../../src/application/usecase/ride/AcceptRide";
import GetRide from "../../src/application/usecase/ride/GetRide";
import RequestRide from "../../src/application/usecase/ride/RequestRide";
import StartRide from "../../src/application/usecase/ride/StartRide";
import UpdatePosition from "../../src/application/usecase/ride/UpdatePosition";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttp";
import { AxiosAdapter } from "../../src/infra/http/HttpClient";
import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

let connection: DatabaseConnection
let requestRide: RequestRide
let getRide: GetRide
let acceptRide: AcceptRide
let startRide: StartRide
let updatePosition: UpdatePosition
let accountGateway: AccountGatewayHttp

beforeEach(function () {
  connection = new PgPromiseAdapter();
  const httpClient = new AxiosAdapter()
  accountGateway = new AccountGatewayHttp(httpClient)
  const rideRepository = new RideRepositoryDatabase(connection);
  const positionRepository = new PositionRepositoryDatabase(connection);

  requestRide = new RequestRide(rideRepository, accountGateway)
  getRide = new GetRide(rideRepository, accountGateway, positionRepository)
  acceptRide = new AcceptRide(rideRepository, accountGateway)
  startRide = new StartRide(rideRepository)
  updatePosition = new UpdatePosition(rideRepository, positionRepository)
})

test("Deve atualizar a posição de uma corrida durante o horário comercial", async function () {
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

  const inputStartRide = {
    rideId: outputRequestRide.rideId
  }
  await startRide.execute(inputStartRide)

  const inputUpdatePositionFrom = {
    rideId: outputRequestRide.rideId,
    lat: -27.584905257808835,
    long: -48.545022195325124,
    date: new Date("2025-04-01T10:00:00")
  }

  const inputUpdatePositionTo = {
    rideId: outputRequestRide.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2025-04-01T10:10:00")
  }

  await updatePosition.execute(inputUpdatePositionFrom)
  await updatePosition.execute(inputUpdatePositionTo)

  const outputGetRide = await getRide.execute(outputRequestRide.rideId)
  expect(outputGetRide.currentLat).toBe(-27.496887588317275)
  expect(outputGetRide.currentLong).toBe(-48.522234807851476)
  expect(outputGetRide.distance).toBe(10)
  expect(outputGetRide.fare).toBe(21)
})

test("Deve atualizar a posição de uma corrida durante o horário noturno", async function () {
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

  const inputStartRide = {
    rideId: outputRequestRide.rideId
  }
  await startRide.execute(inputStartRide)

  const inputUpdatePositionFrom = {
    rideId: outputRequestRide.rideId,
    lat: -27.584905257808835,
    long: -48.545022195325124,
    date: new Date("2025-04-01T23:00:00")
  }

  const inputUpdatePositionTo = {
    rideId: outputRequestRide.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2025-04-01T23:10:00")
  }

  await updatePosition.execute(inputUpdatePositionFrom)
  await updatePosition.execute(inputUpdatePositionTo)

  const outputGetRide = await getRide.execute(outputRequestRide.rideId)
  expect(outputGetRide.currentLat).toBe(-27.496887588317275)
  expect(outputGetRide.currentLong).toBe(-48.522234807851476)
  expect(outputGetRide.distance).toBe(10)
  expect(outputGetRide.fare).toBe(39)
})

test("Deve atualizar a posição de uma corrida durante o domingo", async function () {
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

  const inputStartRide = {
    rideId: outputRequestRide.rideId
  }
  await startRide.execute(inputStartRide)

  const inputUpdatePositionFrom = {
    rideId: outputRequestRide.rideId,
    lat: -27.584905257808835,
    long: -48.545022195325124,
    date: new Date("2025-04-06T10:00:00")
  }

  const inputUpdatePositionTo = {
    rideId: outputRequestRide.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2025-04-06T10:10:00")
  }

  await updatePosition.execute(inputUpdatePositionFrom)
  await updatePosition.execute(inputUpdatePositionTo)

  const outputGetRide = await getRide.execute(outputRequestRide.rideId)
  expect(outputGetRide.currentLat).toBe(-27.496887588317275)
  expect(outputGetRide.currentLong).toBe(-48.522234807851476)
  expect(outputGetRide.distance).toBe(10)
  expect(outputGetRide.fare).toBe(50)
})

afterEach(async () => {
  await connection.close()
})