import Account from "../../src/domain/entity/Account"

test("Deve criar uma account com senha plain", function () {
  const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "AAA9999", false, true, "123456", "plain")
  expect(account.verifyPassword("123456")).toBe(true)
})

test("Deve criar uma account com senha md5", function () {
  const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "AAA9999", false, true, "123456", "md5")
  expect(account.verifyPassword("123456")).toBe(true)
})

test("Deve criar uma account com senha sha1", function () {
  const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "AAA9999", false, true, "123456", "sha1")
  expect(account.verifyPassword("123456")).toBe(true)
})

test("Deve criar uma account com senha sha256", function () {
  const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "AAA9999", false, true, "123456", "sha256")
  expect(account.verifyPassword("123456")).toBe(true)
})