# Sistema de Agendamento de Quadras Esportivas — DFS-2026.2

Projeto da disciplina Desenvolvimento Full Stack Básico (Atlântico Avanti), grupo 4.

## Objetivo
Aplicação web para organizar reserva de quadras esportivas de bairros/centros esportivos, usando um
sistema que cadastra jogadores e quadras, registra reservas de horário e impede
conflitos de agenda na mesma quadra.

## Tecnologias utilizadas
Backend:
- Node.js + Express
- Prisma ORM
- PostgreSQL
- TypeScript
- Jest
- Docker / Docker Compose
- React (Vite)

## Pré-requisitos
- Node.js 20+
- Docker e Docker Compose
- npm

## Como executar o backend
1. Clone o repositório e entre na pasta `backend`:

       git clone <url-do-repositorio>
       cd backend

2. Instale as dependências:

       npm install

3. Crie o arquivo `.env` na pasta `backend` (baseado no `.env.example`) com as
   variáveis de conexão do banco:

       DATABASE_URL="postgresql://admin:admin_da_senha_segura@localhost:5432/pqsl-db"
       MOCK_DATABASE_URL="postgresql://mock_user:mock_password@localhost:5433/pqsl-mock-db"

4. Suba o banco de dados com Docker Compose:

       docker compose -f docker/docker-compose.yml up -d

5. Gere o cliente Prisma e aplique as migrations:

       npx prisma generate
       npx prisma migrate deploy

6. Inicie o servidor:

       npm start

   A API sobe por padrão na porta 3000. Para confirmar que está no ar:

       curl http://localhost:3000/v1/teste


## Como rodar os testes
Os testes usam um banco separado (`postgres-mock`, definido no `docker-compose.yml`),
para não interferir nos dados do banco principal.

1. Suba o banco de testes (se ainda não estiver rodando):

       docker compose -f docker/docker-compose.yml up -d postgres-mock

2. Rode os testes:

       npm test

   Os testes usam `@swc/jest` (configurado em `jest.config.js`) para suportar
   TypeScript e ESM, incluindo os módulos internos do Prisma Client.
 
## Equipe e contribuições
- Camila Vitória — área de contribuição
- Carlos Leonello - área de contribuição
- Clara Bonan Vianna - área de contribuição
- Gabriel Setznagl de Mendonça — área de contribuição
- Igor Ezequiel Duarte Barreto - área de contribuição
- Vitor Alencastro Pantoja - área de contribuição
