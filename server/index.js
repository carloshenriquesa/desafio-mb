import express from "express";
import path from "path";
import cors from "cors";
import { registerUser } from "./controllers/userController.js";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para processar JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS
app.use(cors());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

// Rota catch-all para SPA
app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Rota para cadastrar um novo usuário
app.post("/registration", registerUser);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Algo deu errado!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
