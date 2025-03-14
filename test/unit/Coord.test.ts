import Coord from "../../src/domain/Coord"

test("Não deve criar uma coordenada com latitude inválida", function () { 
  expect(() => new Coord(-180, 180)).toThrow("Invalid latitude")
})

test("Não deve criar uma coordenada com longitude inválida", function () { 
  expect(() => new Coord(90, -270)).toThrow("Invalid longitude")
})

test("Deve criar uma coordenada válida", function () {
  const coord = new Coord(-27.584905257808835, -48.545022195325124)
  expect(coord.getLat()).toBe(-27.584905257808835)
  expect(coord.getLong()).toBe(-48.545022195325124)
})