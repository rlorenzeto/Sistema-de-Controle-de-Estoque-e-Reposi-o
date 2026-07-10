# StockControl

O **StockControl** é uma aplicação full stack para controle de estoque e reposição, organizada em duas partes: `front-end` e `back-end`. O projeto utiliza React com Vite no cliente e Node.js com Express no servidor, mantendo a interface, a API e a comunicação com o banco separadas por responsabilidade.

## Arquitetura

A aplicação segue este fluxo:

```text
Front-end (React + Vite) -> Back-end (Node.js + Express) -> PostgreSQL
```

## Estrutura do projeto

```bash
meu-projeto/
├── front-end/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── back-end/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── routes/
    │   └── app.js
    ├── server.js
    └── package.json
```

### Front-end

- `public/`: arquivos públicos e estáticos.
- `src/assets/`: imagens, ícones e outros arquivos usados na interface.
- `src/components/`: componentes reutilizáveis da aplicação.
- `src/pages/`: páginas principais do sistema.
- `src/services/`: chamadas para a API do back-end.
- `App.jsx`: componente principal da aplicação.
- `main.jsx`: ponto de entrada do React. 

### Back-end

- `src/config/`: configuração da aplicação, como conexão com o banco.
- `src/controllers/`: lógica que recebe requisição e devolve resposta.
- `src/routes/`: definição das rotas da API.
- `src/app.js`: configuração do Express, middlewares e rotas.
- `server.js`: inicialização do servidor.

## Tecnologias utilizadas

### Front-end

- React
- Vite
- JavaScript
- CSS

### Back-end

- Node.js
- Express
- PostgreSQL

## Como rodar o projeto

### 1. Rodar o front-end

Abra um terminal na pasta `front-end` e execute:

```bash
npm install
npm run dev
```

O projeto será iniciado localmente pelo Vite, normalmente em:

```bash
http://localhost:5173
```

### 2. Rodar o back-end

Abra outro terminal na pasta `back-end` e execute:

```bash
npm install
node server.js
```

Se depois houver um script de desenvolvimento configurado no `package.json`, também será possível rodar com:

```bash
npm run dev
```

## Banco de dados

A conexão com o PostgreSQL deve ficar no back-end. O front-end não deve acessar o banco diretamente, porque as credenciais e a lógica de acesso precisam ficar protegidas no servidor.

Exemplo de conexão com PostgreSQL:

```js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'sua_senha',
  database: 'seu_banco',
  port: 5432,
});

module.exports = pool;
```

## Clonar o projeto do GitHub 

Crie uma pasta, abre o terminal na pasta criada para baixar o conteúdo do GitHub:

```bash
git clone https://github.com/SEU-USUARIO/StockControl.git .
```

## Como enviar alterações para o GitHub

Na pasta raiz do projeto, execute:

```bash
git add .
git commit -m "descrição da alteração"
git pull origin main
git push origin main
```

Se a branch principal do projeto estiver como `master`, use:

```bash
git pull origin master
git push origin master
```

## Observações

- Durante o desenvolvimento, o front-end e o back-end devem ser executados em terminais separados.
