const CPF_LENGTH = 11
const FACTOR_FIRST_DIGIT = 10
const FACTOR_SECOND_DIGIT = 11

export function validateCpf (rawCpf: string) {
	if (!rawCpf) return false

  const cpf = removeNonDigits(rawCpf)
  if (cpf.length !== CPF_LENGTH) return false
  if (allDigitsTheSame(cpf)) return false

  let digit1 = calculateDigit(cpf, FACTOR_FIRST_DIGIT)
  let digit2 = calculateDigit(cpf, FACTOR_SECOND_DIGIT)
 
  return cpf.slice(9) == `${digit1}${digit2}`
}

function removeNonDigits(cpf: string) {
  return cpf.replace(/\D/g, "")
}

function allDigitsTheSame(cpf: string) {
  const [firstDigit] = cpf
  return [...cpf].every(digit => digit === firstDigit)
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0
  for (const digit of cpf) {
    if(factor > 1) total += parseInt(digit) * factor--
  }

  const rest = total % 11
  return (rest < 2) ? 0 : 11 - rest
}