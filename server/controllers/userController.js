import {
  isValidCPF,
  isValidEmail,
  isValidNameLength,
  isValidBirthDate,
  isValidCNPJ,
  isValidOpeningDate,
  isValidPassword,
  isValidPhone,
} from "../../shared/validators.js";

import { PERSON_TYPES } from "../../shared/constants.js";

// Simulação de banco de dados em memória
const users = [];

// Controlador para cadastro de usuários
export function registerUser(req, res) {
  let newUser = {};

  try {
    const userData = req.body;

    if (!userData.email || !isValidEmail(userData.email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido",
      });
    }

    if (!userData.email || !userData.password) {
      return res.status(400).json({
        success: false,
        message: "Dados incompletos para cadastro",
      });
    }

    if (!isValidNameLength(userData.name)) {
      return res.status(400).json({
        success: false,
        message: "Nome inválido",
      });
    }

    if (!isValidEmail(userData.email)) {
      return res.status(400).json({
        success: false,
        message: "Telefone inválido",
      });
    }

    if (
      userData.personType === PERSON_TYPES.PF.code &&
      !isValidBirthDate(userData.birthDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "Data de aniversário inválido",
      });
    }

    if (
      userData.personType === PERSON_TYPES.PJ.code &&
      !isValidOpeningDate(userData.openingDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "Data de abertura inválido",
      });
    }

    if (
      userData.personType === PERSON_TYPES.PF.code &&
      !isValidCPF(userData.cpf)
    ) {
      return res.status(400).json({
        success: false,
        message: "CPF inválido",
      });
    }

    if (
      userData.personType === PERSON_TYPES.PJ.code &&
      !isValidCNPJ(userData.cnpj)
    ) {
      return res.status(400).json({
        success: false,
        message: "CNPJ inválido",
      });
    }

    if (!isValidPhone(userData.phone)) {
      return res.status(400).json({
        success: false,
        message: "Telefone inválido",
      });
    }

    if (!isValidPassword(userData.password)) {
      return res.status(400).json({
        success: false,
        message: "Telefone inválido",
      });
    }

    if (users.some((user) => user.email === newUser.email)) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
      });
    }

    // Simula verificação de email já existente (20% de chance)
    if (Math.random() < 0.2) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
      });
    }

    // Simulação de inserção no banco de dados
    newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
    };

    users.push(newUser);

    // Resposta de sucesso (simulando alguma latência)
    setTimeout(() => {
      res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          ...(newUser.personType === PERSON_TYPES.PF.code
            ? {
                cpf: newUser.cpf,
                birthDate: newUser.birthDate,
              }
            : {
                cnpj: newUser.cnpj,
                openingDate: newUser.openingDate,
              }),
          personType: newUser.personType,
          phone: newUser.phone,
        },
      });
    }, 500);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
