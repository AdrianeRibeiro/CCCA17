import Ride from "../../domain/Ride"

// repo faz a mediação entre a camada de domínio e a persistência,ou restaurar o estado de uma objeto
export default interface RideRepository {
  saveRide (ride: Ride): Promise<void>
  getRideById (rideId: string): Promise<Ride>
  hasActiveRideByPassengerId (passengerId: string): Promise<boolean>
}