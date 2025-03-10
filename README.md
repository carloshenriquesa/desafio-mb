# Desafio Mercado Bitcoin

Este projeto consiste em um aplicativo Vue.js localizado no diretório `client` e um mock server localizado no diretório `server`.

https://github.com/user-attachments/assets/85212dc8-4306-4014-903d-e97d28e54b6a

Além do fluxo de sucesso, também há uma simulação de erro que acontece de maneira randômica:
<img width="516" alt="Screenshot 2025-03-09 at 22 41 16" src="https://github.com/user-attachments/assets/d792a5db-884b-4f4b-8832-bc0101d9a5af" />

## Estrutura do Projeto

- `client/`: Contém o aplicativo Vue.js.
- `server/`: Contém o mock server construído com Express.js.
- `shared/`: Contém os scripts compartilhados nas duas pontas.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/carloshenriquesa/desafio-mb.git
   cd desafio-mb

2. Execute o comando para rodar o servidor localmente:

    ```sh
   npm run server

3. Agora você acessar localmente o projeto no endereço `http://localhost:3000`

Caso queira executar o Vue localmente, pode usar o seguinte comando no diretório raiz:
   
    ```sh
   npm run dev:client

Nesse caso o acesso será no endereço `http://localhost:5173`
