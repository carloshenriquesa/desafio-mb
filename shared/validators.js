export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidCPF(cpf) {
  let sum = 0;
  let remainder;

  var strCPF = String(cpf).replace(/[^\d]/g, "");

  if (strCPF.length !== 11) return false;

  if (
    [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
    ].indexOf(strCPF) !== -1
  )
    return false;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

  remainder = (sum * 10) % 11;

  if (remainder == 10 || remainder == 11) remainder = 0;

  if (remainder != parseInt(strCPF.substring(9, 10))) return false;

  sum = 0;

  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

  remainder = (sum * 10) % 11;

  if (remainder == 10 || remainder == 11) remainder = 0;

  if (remainder != parseInt(strCPF.substring(10, 11))) return false;

  return true;
}

export function isValidCNPJ(cnpj) {
  // Remove any non-digit characters
  cnpj = cnpj.replace(/[^\d]/g, "");

  // Check if it has 14 digits
  if (cnpj.length !== 14) return false;

  // Check for obvious invalid values
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Calculate first verification digit
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let mod = sum % 11;
  const digit1 = mod < 2 ? 0 : 11 - mod;

  // Calculate second verification digit
  sum = 0;
  weight = 6;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  sum += digit1 * 2;
  mod = sum % 11;
  const digit2 = mod < 2 ? 0 : 11 - mod;

  // Check if the calculated verification digits match the CNPJ ones
  return (
    parseInt(cnpj.charAt(12)) === digit1 && parseInt(cnpj.charAt(13)) === digit2
  );
}

export function isValidBirthDate(inputDate) {
  const currentDate = new Date();
  const userDate = new Date(inputDate);

  // Check if userDate is a valid date and is not in the future
  if (isNaN(userDate) || userDate > currentDate) {
    return false;
  }

  // Ensure the user is at least 18 years old
  const minAgeDate = new Date();
  minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
  if (userDate > minAgeDate) {
    return false;
  }
  return true;
}

export function isValidOpeningDate(inputDate) {
  const currentDate = new Date();
  const userDate = new Date(inputDate);

  // Check if userDate is a valid date and is not in the future
  if (isNaN(userDate) || userDate > currentDate) {
    return false;
  }

  return true;
}

export function isValidPassword(password) {
  // at least one number, at least one letter, correct length
  const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;
  return isValidPassword.test(password);
}

export function isValidNameLength(name) {
  return name.length >= 3 && name.length <= 100;
}

export function isValidPhone(phone) {
  phone = phone.replace(/\D/g, "");

  if (phone.length < 10 || phone.length > 11) {
    return false;
  }

  if (phone.length === 11 && phone.charAt(2) !== "9") {
    return false;
  }

  if (/^(\d)\1+$/.test(phone)) {
    return false;
  }

  const ddd = parseInt(phone.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  return true;
}
