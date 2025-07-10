import RideCompletedEvent from "../../../domain/event/RideCompletedEvent";
import Mediator from "../../../infra/mediator/Mediator";
import RideRepository from "../../repository/RideRepository";
import ProcessPayment from "../payment/ProcessPayment";
import UseCase from "../UseCase";

export default class FinishRide implements UseCase {

  constructor(
    readonly rideRepository: RideRepository,
    readonly mediator: Mediator
  ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.getRideById(input.rideId)

    ride.register("rideCompleted", (event: RideCompletedEvent) => {
      this.mediator.notify("rideCompleted", event)
    })

    ride.finish()
    await this.rideRepository.updateRide(ride)    
  }
}

type Input = {
  rideId: string
}
