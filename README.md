# 🏟️ Sistema de Agendamento de Quadras Esportivas

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> Projeto da disciplina **Desenvolvimento Full Stack Básico** (Atlântico Avanti) — Grupo 4 — Turma DFS-2026.2

---

## 💻 Sobre o projeto

O **Sistema de Agendamento de Quadras Esportivas** é uma aplicação web voltada para a organização de reservas de quadras esportivas em bairros e centros esportivos.

A plataforma permite:
- 🧑‍🤝‍🧑 Cadastrar **jogadores**;
- 🏸 Cadastrar **quadras** e suas categorias (futebol, vôlei, tênis, etc.);
- 📅 Registrar **reservas** de horário por quadra e data;
- 🚫 Impedir **conflitos de agenda**, garantindo que a mesma quadra não seja reservada duas vezes no mesmo horário.

O projeto foi construído com uma arquitetura em camadas no back-end (API REST), banco de dados relacional gerenciado via ORM, testes automatizados isolados por ambiente e conteinerização completa via Docker — reproduzindo boas práticas de um fluxo de desenvolvimento profissional.

---

## 🛠 Tecnologias

O projeto está dividido em **Back-End** (API REST) e **Front-End** (interface web), com o Docker orquestrando o ambiente de banco de dados.

### 🎨 Front-End

| Tecnologia | Descrição |
|---|---|
| ⚛️ **React** | Biblioteca para construção da interface do usuário |
| ⚡ **Vite** | Build tool utilizada para desenvolvimento rápido do front-end |

### ⚙️ Back-End

| Tecnologia | Descrição |
|---|---|
| 🟩 **Node.js** | Ambiente de execução JavaScript no servidor |
| 🚂 **Express** | Framework para construção da API REST |
| 🔷 **TypeScript** | Superset de JavaScript com tipagem estática |
| ▲ **Prisma ORM** | Mapeamento objeto-relacional para acesso ao banco de dados |
| 🐘 **PostgreSQL** | Banco de dados relacional principal da aplicação |
| 🃏 **Jest** (+ `@swc/jest`) | Framework de testes unitários, com suporte a TypeScript/ESM |

### 🐳 DevOps

| Tecnologia | Descrição |
|---|---|
| 🐳 **Docker & Docker Compose** | Conteinerização do banco de dados de produção e do banco de testes (`postgres-mock`) |

---

## 🚀 Funcionalidades

- ✅ Cadastro de **jogadores**
- ✅ Cadastro de **quadras**, com filtros por categoria
- ✅ Criação de **reservas**, com validação de horário e filtros por data e quadra
- ✅ Bloqueio automático de **conflitos de agendamento** na mesma quadra
- ✅ Conteinerização do banco de dados principal (`postgres`) via Docker Compose
- ✅ Banco de dados isolado para testes automatizados (`postgres-mock`), sem impactar os dados de produção
- ✅ Testes unitários com **Jest** com cobertura de código de (100% Jogador, 100% Quadra, 100% Reserva)
- ✅ Interface web (front-end em React com Axios)
- ✅ Documentação da API via Swagger Open API 3.0
- ✅ Autenticação e autorização de usuários com JWT

---

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- [Node.js](https://nodejs.org/) 20+
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/)

---
## ⚙️ Como executar o front-end

1. Clone o repositório e entre na pasta `frontend`:

   ```bash
   git clone <url-do-repositorio>
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   O front-end estará disponível em `http://localhost:5173` por padrão.

## ⚙️ Como executar o back-end

1. Clone o repositório e entre na pasta `backend`:

   ```bash
   git clone <url-do-repositorio>
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo `backend/.env` na pasta `backend` (baseado no `.env.example`) com as variáveis de 
  conexão do banco e segredos JWT de exemplo.:

   ```env
   DATABASE_URL="postgresql://admin:admin@localhost:5432/psql_db"
   MOCK_DATABASE_URL="postgresql://mock_user:mock_password@localhost:5433/psql_mock_db"
   ACCESS_SECRET_JWT="9CbOXnDO7SSTD|eK@-3C;*(3y3,Y^q@}Y$y!^d/kCZ6"
   REFRESH_SECRET_JWT="9CbOXnDO7SSTD|eK@-3C;*(3y3,Y^q@}Y$y!^d/kCZ8"
   ```

4. Suba o banco de dados com Docker Compose:

   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```

5. Gere o cliente Prisma e aplique as migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

6. Inicie o servidor:

   ```bash
   npm start
   ```

   A API sobe por padrão na porta `3000`. Para confirmar que está no ar:

   ```bash
   curl http://localhost:3000/v1/teste
   ```

---

## 🧪 Como rodar os testes

Os testes usam um banco **separado** (`postgres-mock`, definido no `docker-compose.yml`), garantindo que não interfiram nos dados do banco principal.

1. Suba o banco de testes (caso ainda não esteja rodando):

   ```bash
   docker compose -f docker/docker-compose.yml up -d postgres-mock
   ```

2. Rode os testes:

   ```bash
   npm test
   ```

   Os testes usam **`@swc/jest`** (configurado em `jest.config.js`) para suportar TypeScript e ESM, incluindo os módulos internos do Prisma Client.

---

## 🌎 Autores e Contribuições
<table> 
  <tr> 
    <td align="center"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/91721431?v=4" width="100px;" alt="Foto do autor"/> 
        <br />
      </a>
        <p align="center"><b>Gabriel Setznagl de Mendonça</b></p>
        <b align="center">☕ Back-End</b> <br><br>
        <b align="center">Implementação do Jogador, scripts Docker, testes unitários com Jest e autenticação com JWT<br></b>
        <br>
    </td> 
    <td align="center"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/243326528?v=4" width="100px;" alt="Foto do autor"/> 
        <br />
      </a>
        <p align="center"><b>Vitor Alencastro Pantoja</b></p>
        <b align="center">🎨 Front-End</b> <br>
        <b align="center">☕ Back-End</b> <br><br> 
        <b align="center">Gerenciamento do repositório GitHub, README e integração do front-end com o back-end<br></b>
        <br /> 
    </td> 
        <td align="center"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/231565173?v=4" width="100px;" alt="Foto do autor"/> 
        <br />
      </a>
        <p align="center"><b>Clara Bonan Vianna</b></p>
        <b align="center">🎨 Front-End</b> <br>
        <b align="center">☕ Back-End</b> <br><br> 
        <b align="center">Implementação de Reserva, validação de horário e filtros de data e quadra<br></b>
        <br /> 
    </td> 
        <td align="center"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/188599152?v=4" width="100px;" alt="Foto do autor"/> 
        <br />
      </a>
        <p align="center"><b>Carlos Leonello</b></p>
        <b align="center"><br>💾 Database</b> <br><br>
        <b align="center">Modelagem do Banco de dados e modelo entidade-relacionamento<br></b>
        <br /> 
    </td> 
        <td align="center"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/131815218?v=4" width="100px;" alt="Foto do autor"/> 
        <br />
      </a>
        <p align="center"><b>Igor Ezequiel Duarte Barreto</b></p>
        <b align="center">☕ Back-End</b> <br><br>
        <b align="center">Implementação de Quadra e filtros por categorias<br></b>
        <br /> 
    </td> 
        </td> 
        <td align="center"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/177791071?v=4" width="100px;" alt="Foto do autor"/> 
        <br />
      </a>
        <p align="center"><b>Camila Vitória</b></p>
        <b align="center">🎨 Front-End</b>
        <b align="center"><br>👥 Scrum-Master</b> <br><br>
        <b align="center">Gerenciamento e divisão de tarefas pelo Trello e apoio no desenvolvimento das telas do front-end<br></b>
        <br /> 
    </td>
       </td> 
        </td> 
        <td align="center"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/131381230?v=4" width="100px;" alt="Foto do autor"/> 
        <br />
      </a>
        <p align="center"><b>Dennis Araujo</b></p>
        <b align="center"><br>🎨 Front-End</b> <br><br>
        <b align="center">Refinamento dos componentes do front-end e ajustes finos<br></b>
        <br /> 
    </td> 

  </tr> 
</table>

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais no âmbito da disciplina **Desenvolvimento Full Stack Básico** — Atlântico Avanti, turma DFS-2026.2.