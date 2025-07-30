import GetRide from "../../src/application/usecase/ride/GetRide"
import RequestRide from "../../src/application/usecase/ride/RequestRide"
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection"
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttp"
import { AxiosAdapter, FetchAdapter } from "../../src/infra/http/HttpClient"
import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase"
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase"
import axios from "axios";

let connection: DatabaseConnection
let requestRide: RequestRide
let getRide: GetRide
let accountGateway: AccountGatewayHttp

beforeEach(function () {
  connection = new PgPromiseAdapter();
  const rideRepository = new RideRepositoryDatabase(connection);
  const positionRepository = new PositionRepositoryDatabase(connection);
  const httpClient = new AxiosAdapter()
  //const httpClient = new FetchAdapter()
  accountGateway = new AccountGatewayHttp(httpClient)
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

  await axios.post("http://localhost:3000/request_ride_async", inputRequestRide)
  // expect(outputGetRide).toMatchObject({
  //   rideId: outputRequestRide.rideId,
  //   passengerId: inputRequestRide.passengerId,
  //   fromLat: inputRequestRide.fromLat,
	// 	fromLong: inputRequestRide.fromLong,
	// 	toLat: inputRequestRide.toLat,
	// 	toLong: inputRequestRide.toLong,
  //   status: "requested"
  // });
})