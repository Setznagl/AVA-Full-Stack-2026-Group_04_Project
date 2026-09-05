# 🏟️ Sports Court Reservation System

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> Project from **FullStack** trail (Atlântico Avanti 2026) — Group 4 — FullStackDeveloper-2026.2

---

## 💻 About the project

The **Sports Court Reservation System** is a full-stack web application designed to organize reservations of sports courts in neighborhoods and sports centers.

The platform allows:
- 🧑‍🤝‍🧑 Register **players**;
- 🏸 Register **courts** with categories (soccer, volley, tennis, etc.);
- 📅 Register **reservations** with validation of date and time, as well as filters by date and court;
- 🚫 Prevent **schedule conflicts**, ensuring that no two reservations overlap for the same court.

The project was built using a layered back-end architecture (REST API), a relational database managed via ORM, automated tests isolated by environment, and full containerization via Docker—reflecting best practices for a professional development workflow.

---

## 🛠 Tecnologies

This project is divided into **Back-End** (REST API) and **Front-End** (web interface), with Docker orchestrating the database environment..

### 🎨 Front-End

| Tecnology    | Description                                                   |
|--------------|---------------------------------------------------------------|
| ⚛️ **React** | Library for building user interfaces                          |
| ⚡ **Vite**  | Build tool for rapid development of the front-end             |

### ⚙️ Back-End

| Tecnology                   | Description                                                 |
|-----------------------------|-------------------------------------------------------------|
| 🟩 **Node.js**              | Server-side JavaScript runtime environment                  |
| 🚂 **Express**              | Framework for building REST APIs                            |
| 🔷 **TypeScript**           | A superset of JavaScript with static typing                 |
| ▲ **Prisma ORM**            | Object-relational mapping for database access               |
| 🐘 **PostgreSQL**           | The application’s primary relational database               |
| 🃏 **Jest** (+ `@swc/jest`) | Unit testing framework with support for TypeScript/ESM      |

### 🐳 DevOps

| Tecnologia | Descrição |
|---|---|
| 🐳 **Docker & Docker Compose** | Containerization of the production database and the test database (`postgres-mock`) |

---

## 🚀 Funcionabilities

- ✅ Registration of **players**
- ✅ Registration of **courts**, with filters by category
- ✅ Creation of **reservations**, with time validation and filters by date and court
- ✅ Automatic blocking of **scheduling conflicts** on the same court
- ✅ Containerization of the main database (`postgres`) via Docker Compose
- ✅ Isolated database for automated testing (`postgres-mock`), without impacting production data
- ✅ Unit tests with **Jest** with code coverage of (100% Player, 100% Court, 100% Reservation)
- ✅ Web interface (React front-end with Axios)
- ✅ API documentation via Swagger Open API 3.0
- ✅ User authentication and authorization with JWT

---

## 📋 Prerequisites

Before you begin, you'll need to have the following installed:

- [Node.js](https://nodejs.org/) 20+
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/)

---
## ⚙️ How to run the front-end

1. Clone the repository and enter the `frontend` folder:

   ```bash
   git clone <url-do-repositorio>
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Initiate the development server:

   ```bash
   npm run dev
   ```

   The front-end will be available at `http://localhost:5173` by default.

## ⚙️ How to run the back-end

1. Clone the repository and enter the `backend` folder:

   ```bash
   git clone <url-do-repositorio>
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create the `backend/.env` file in the `backend` folder (based on the `.env.example`) with the database connection variables and example JWT secrets.

   ```env
   DATABASE_URL="postgresql://admin:admin@localhost:5432/psql_db"
   MOCK_DATABASE_URL="postgresql://mock_user:mock_password@localhost:5433/psql_mock_db"
   ACCESS_SECRET_JWT="9CbOXnDO7SSTD|eK@-3C;*(3y3,Y^q@}Y$y!^d/kCZ6"
   REFRESH_SECRET_JWT="9CbOXnDO7SSTD|eK@-3C;*(3y3,Y^q@}Y$y!^d/kCZ8"
   ```

4. start the database with Docker Compose:

   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```

5. Generate the Prisma client and apply the migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

6. Start the server:

   ```bash
   npm start
   ```

   The API starts by default on port `3000`. To confirm that it's running:

   ```bash
   curl http://localhost:3000/v1/teste
   ```

---

## 🧪 How to run the tests

The tests use a **separate** database (`postgres-mock`, defined in `docker-compose.yml`), ensuring that they don't interfere with the data in the main database.

1. Start the test database (if it's not already running):

   ```bash
   docker compose -f docker/docker-compose.yml up -d postgres-mock
   ```

2. Run the tests:

   ```bash
   npm test
   ```

   The tests use **`@swc/jest`** (configured on `jest.config.js`) to support TypeScript and ESM, including the internal modules of the Prisma Client.

---

## 🌎 Authors and Contributions
<table> 
  <tr> 
    <td align="center" width="13.75%"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/91721431?v=4" width="100%"/> 
        <br />
      </a>
        <p align="center"><b>Gabriel Setznagl de Mendonça</b></p>
        <b align="center">☕ Back-End</b> <br><br>
        <b align="center">Player Entity, README , Code refactor, Docker scripts, Unit tests with Jest and auth using JWT<br></b>
        <br>
    </td> 
    <td align="center" width="13.75%"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/243326528?v=4" width="100%"/> 
        <br />
      </a>
        <p align="center"><b>Vitor Alencastro Pantoja</b></p>
        <b align="center">🎨 Front-End</b> <br>
        <b align="center">☕ Back-End</b> <br><br> 
        <b align="center">Repository Management and integrations between front-end and back-end<br></b>
        <br /> 
    </td> 
        <td align="center" width="13.75%"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/231565173?v=4" width="100%"/> 
        <br />
      </a>
        <p align="center"><b>Clara Bonan Vianna</b></p>
        <b align="center">🎨 Front-End</b> <br>
        <b align="center">☕ Back-End</b> <br><br> 
        <b align="center">Reservation Entity, schedule validation and date and term filters<br></b>
        <br /> 
    </td> 
        <td align="center" width="13.75%"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/188599152?v=4" width="100%"/> 
        <br />
      </a>
        <p align="center"><b>Carlos Leonello</b></p>
        <b align="center"><br>💾 Database</b> <br><br>
        <b align="center">Database modeling and entity-relationship model<br></b>
        <br /> 
    </td> 
        <td align="center" width="13.75%"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/131815218?v=4" width="100%"/> 
        <br />
      </a>
        <p align="center"><b>Igor Ezequiel Duarte Barreto</b></p>
        <b align="center">☕ Back-End</b> <br><br>
        <b align="center">Court entity and category filters<br></b>
        <br /> 
    </td> 
        </td> 
        <td align="center" width="13.75%"> 
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/177791071?v=4" width="100%"/> 
        <br />
      </a>
        <p align="center"><b>Camila Vitória</b></p>
        <b align="center">🎨 Front-End</b>
        <b align="center"><br>👥 Scrum-Master</b> <br><br>
        <b align="center">Agile Scrum Master using Trello and support in the development of the front-end screens<br></b>
        <br /> 
    </td>
       </td> 
        </td> 
        <td align="center" width="13.75%">
      <a href="https://github.com/">
        <img src="https://avatars.githubusercontent.com/u/131381230?v=4" width="100%"/> 
        <br />
      </a>
        <p align="center"><b>Dennis Araujo</b></p>
        <b align="center"><br>🎨 Front-End</b> <br><br>
        <b align="center">Refinement of front-end components and fine-tuning<br></b>
        <br /> 
    </td> 

  </tr> 
</table>

## 📝 Licença

This project was developed for educational purposes as part of the course **Full Stack Development** — Atlântico Avanti, turma FSD-2026.2.