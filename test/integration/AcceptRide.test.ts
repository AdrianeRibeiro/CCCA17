import MailerGateway from "../../src/application/gateway/MailerGateway";
import Signup from "../../src/application/usecase/account/Signup";
import AcceptRide from "../../src/application/usecase/ride/AcceptRide";
import GetRide from "../../src/application/usecase/ride/GetRide";
import RequestRide from "../../src/application/usecase/ride/RequestRide";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import MailerGatewayFake from "../../src/infra/gateway/MailerGatewayFake";
import { AccountRepositoryDatabase } from "../../src/infra/repository/AccountRepository";
import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

let connection: DatabaseConnection
let signup: Signup
let mailerGateway: MailerGateway
let requestRide: RequestRide
let getRide: GetRide
let acceptRide: AcceptRide

beforeEach(function () {
  connection = new PgPromiseAdapter();
  const accountRepository = new AccountRepositoryDatabase(connection);
  mailerGateway = new MailerGatewayFake()
	signup = new Signup(accountRepository, mailerGateway)
  const rideRepository = new RideRepositoryDatabase(connection);
  requestRide = new RequestRide(rideRepository, accountRepository)
  const positionRepository = new PositionRepositoryDatabase(connection);
  getRide = new GetRide(rideRepository, accountRepository, positionRepository)
  acceptRide = new AcceptRide(rideRepository, accountRepository)
})

test("Deve aceitar uma corrida", async function () {
  const inputSignupPassenger = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true
  }
  const outputSignupPassenger = await signup.execute(inputSignupPassenger)

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
  const outputSignupDriver = await signup.execute(inputSignupDriver)
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
  const outputSignupPassenger = await signup.execute(inputSignupPassenger)

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
  const outputSignupDriver = await signup.execute(inputSignupDriver)
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