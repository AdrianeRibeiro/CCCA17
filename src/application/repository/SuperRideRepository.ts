import Ride from "../../domain/Ride"
import SuperRide from "../../domain/SuperRide"

// repo faz a mediação entre a camada de domínio e a persistência,ou restaurar o estado de uma objeto
export default interface RideRepositoryRepository {
  saveRide (ride: Ride): Promise<void>
  getRideById (rideId: string): Promise<SuperRide>
}