import Ride from "../../src/domain/Ride"

test("Não deve criar uma corrida com coordenada inválida", function () {
    expect(() => Ride.create("", -180, 180, -180, 180)).toThrow("Invalid latitude")
})