import { validateCpf } from "../src/validateCpf"

test.each([
  "97456321558",
  "71428793860",
  "87748248800"
])("Deve testar se o cpf %s é válido", function (cpf: string) {
  const isValid = validateCpf(cpf)
  expect(isValid).toBe(true)
})

test.each([
  "",
  null,
  undefined,
  "123456",
  "123456789987654321",
  "11111111111"
])("Deve testar se o cpf %s é inválido", function (cpf: any) {
  const isValid = validateCpf(cpf)
  expect(isValid).toBe(false)
})
