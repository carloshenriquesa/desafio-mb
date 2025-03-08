import { isValidCPF, isValidEmail } from '../../shared/validators.js';

// Simulação de banco de dados em memória
const users = [];

// Controlador para cadastro de usuários
export function registerUser(req, res) {
  try {
    const userData = req.body;

    if (!userData.email || !isValidEmail(userData.email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email inválido' 
      });
    }
    
    if (!userData.email || !userData.password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados incompletos para cadastro' 
      });
    }
    
    if (userData.personType === 'PF' && !isValidCPF(userData.cpf)) {
      return res.status(400).json({ 
        success: false, 
        message: 'CPF inválido' 
      });
    }
    
    // Simulação de inserção no banco de dados
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    // Resposta de sucesso (simulando alguma latência)
    setTimeout(() => {
      res.status(201).json({ 
        success: true, 
        message: 'Usuário cadastrado com sucesso',
        user: { id: newUser.id, email: newUser.email }
      });
    }, 500);
    
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};
