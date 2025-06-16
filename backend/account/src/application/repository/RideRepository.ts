import Ride from "../../domain/entity/Ride"

// repo faz a mediação entre a camada de domínio e a persistência,ou restaurar o estado de uma objeto
export default interface RideRepository {
  saveRide (ride: Ride): Promise<void>
  getRideById (rideId: string): Promise<Ride>
  hasActiveRideByPassengerId (passengerId: string): Promise<boolean> //conveniente retornar boolean. Mas não é o objetivo do repositório. Aqui não estou fazendo persistência nem restaurando o estado do objeto
  hasActiveRideByDriverId (driverId: string): Promise<boolean>
  updateRide (ride: Ride): Promise<void>
}