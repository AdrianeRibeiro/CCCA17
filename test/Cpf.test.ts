import Cpf from "../src/domain/Cpf"

test.each([
  "97456321558",
  "71428793860",
  "87748248800"
])("Deve testar se o cpf %s é válido", function (cpf: string) {
  expect(new Cpf(cpf)).toBeDefined()
})

test.each([
  "",
  null,
  undefined,
  "123456",
  "123456789987654321",
  "11111111111"
])("Deve testar se o cpf %s é inválido", function (cpf: any) {
  expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"))
})
