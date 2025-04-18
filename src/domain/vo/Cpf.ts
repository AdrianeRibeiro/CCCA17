export default class Cpf {
  private value: string

  private CPF_LENGTH = 11
  private FACTOR_FIRST_DIGIT = 10
  private FACTOR_SECOND_DIGIT = 11

  constructor (cpf: string) {
    if(!this.validate(cpf)) throw new Error("Invalid cpf")
    this.value = cpf
  }

  private validate(rawCpf: string) {
    if (!rawCpf) return false
  
    const cpf = this.removeNonDigits(rawCpf)
    if (cpf.length !== this.CPF_LENGTH) return false
    if (this.allDigitsTheSame(cpf)) return false
  
    let digit1 = this.calculateDigit(cpf, this.FACTOR_FIRST_DIGIT)
    let digit2 = this.calculateDigit(cpf, this.FACTOR_SECOND_DIGIT)
   
    return cpf.slice(9) == `${digit1}${digit2}`
  }
  
  private removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, "")
  }
  
  private allDigitsTheSame(cpf: string) {
    const [firstDigit] = cpf
    return [...cpf].every(digit => digit === firstDigit)
  }
  
  private calculateDigit(cpf: string, factor: number) {
    let total = 0
    for (const digit of cpf) {
      if(factor > 1) total += parseInt(digit) * factor--
    }
  
    const rest = total % 11
    return (rest < 2) ? 0 : 11 - rest
  }

  getValue() {
    return this.value
  }
}