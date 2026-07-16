# 🐘 PostgreSQL com Dockerfile

Este guia descreve como construir uma imagem personalizada do PostgreSQL utilizando um `Dockerfile` e iniciar um container a partir dela.

---

## 📁 Estrutura do Projeto

```text
.
├── Dockerfile
└── banco.sql
```

- **Dockerfile**: configura a imagem personalizada do PostgreSQL.
- **banco.sql**: script SQL executado automaticamente na primeira inicialização do banco.

---

## 📄 Dockerfile

```dockerfile
# Dockerfile para o serviço de banco de dados PostgreSQL
# Usando o  postgres:15 como imagem base
FROM postgres:15

# Scripts de inicialização (opcional)
COPY banco.sql /docker-entrypoint-initdb.d/
```

> **Observação:** Todo arquivo `.sql` copiado para `/docker-entrypoint-initdb.d/` será executado automaticamente **apenas na primeira criação do banco de dados**.

---

# 🚀 Construindo a Imagem

Execute o comando abaixo para gerar a imagem Docker:

```bash
# Aqui evitaremos o cache para garantir que o script SQL seja copiado corretamente
# Evitaremos passar credenciais sensíveis no build, já que elas ficam acessíveis no histórico da imagem.
# Elas serão passadas apenas na execução do container.
docker build --no-cache \
  -t avanti-fullstack-2026-g4-db-image .
```

Após a execução, a imagem `avanti-fullstack-2026-g4-db-image` estará disponível localmente.

Verifique:

```bash
docker images
```

---

# ▶️ Executando o Container

Crie e inicie o container:

```bash
docker run -d \
  --name avanti-fullstack-2026-g4-db \
  -p 5432:5432 \
  -e POSTGRES_DB=pqsl-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin_da_senha_segura \
  avanti-fullstack-2026-g4-db-image
```

Parâmetros utilizados:

| Parâmetro                            | Descrição                                                            |
|--------------------------------------|----------------------------------------------------------------------|
| `-d`                                 | Executa o container em segundo plano.                                |
| `--name avanti-fullstack-2026-g4-db` | Nome do container.                                                   |
| `-p 5432:5432`                       | Mapeia a porta 5432 do container para a porta 5432 da máquina local. |

---

# 🔍 Verificando o Container

Listar os containers em execução:

```bash
docker ps
```

Ver todos os containers:

```bash
docker ps -a
```

Visualizar os logs:

```bash
docker logs -f avanti-fullstack-2026-g4-db
```

Quando aparecer a mensagem abaixo, o banco estará pronto para receber conexões:

```text
database system is ready to accept connections
```

---

# 💻 Acessando o PostgreSQL

Abra um terminal dentro do container:

```bash
docker exec -it avanti-fullstack-2026-g4-db bash
```

Ou conecte-se diretamente ao banco:

```bash
docker exec -it avanti-fullstack-2026-g4-db \
psql -U admin -d pqsl-db
```

---

# 🛑 Parando o Container

```bash
docker stop avanti-fullstack-2026-g4-db
```

---

# ▶️ Reiniciando o Container

```bash
docker start avanti-fullstack-2026-g4-db
```

---

# 🗑️ Removendo o Container

```bash
docker rm -f avanti-fullstack-2026-g4-db
```

> A imagem criada permanecerá disponível para ser utilizada novamente.

---

# 🗑️ Removendo a Imagem

Caso deseje remover também a imagem:

```bash
docker rmi avanti-fullstack-2026-g4-db-image
```

---

# 📌 Resumo

| Ação               | Comando                                                                |
|--------------------|------------------------------------------------------------------------|
| Construir imagem   | `docker build ...`                                                     |
| Executar container | `docker run ...`                                                       |
| Ver containers     | `docker ps`                                                            |
| Ver logs           | `docker logs -f avanti-fullstack-2026-g4-db`                           |
| Acessar PostgreSQL | `docker exec -it avanti-fullstack-2026-g4-db psql -U admin -d pqsl-db` |
| Parar              | `docker stop avanti-fullstack-2026-g4-db`                              |
| Iniciar            | `docker start avanti-fullstack-2026-g4-db`                             |
| Remover container  | `docker rm -f avanti-fullstack-2026-g4-db`                             |
| Remover imagem     | `docker rmi avanti-fullstack-2026-g4-db-image`                         |

---

## ⚠️ Observações

- O script `banco.sql` é executado **somente na primeira inicialização** do banco.
- Caso o container utilize um volume persistente, remover e criar o container novamente **não** executará o script SQL outra vez.
- Para reaplicar o script de inicialização, remova também o volume de dados ou utilize um novo volume.