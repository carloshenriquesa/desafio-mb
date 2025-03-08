export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
export function isValidCPF(cpf) {
    return cpf && cpf.length === 11;
}
