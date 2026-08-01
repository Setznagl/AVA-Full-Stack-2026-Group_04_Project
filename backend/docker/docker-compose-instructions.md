# Build da imagem Docker

O projeto utiliza o **Docker Compose** para construir a imagem do banco de dados. A imagem é automaticamente versionada com o **hash curto do commit atual**, facilitando a rastreabilidade entre a imagem gerada e o código-fonte.

## Construindo a imagem

No diretório do projeto, execute:

```bash
IMAGE_TAG=$(git rev-parse --short HEAD) docker compose build
```

Após a execução, a imagem será criada com uma tag no formato:

```text
avanti-fullstack-2026-g4-db-image:<hash-do-commit>
```

Exemplo:

```text
avanti-fullstack-2026-g4-db-image:a1b2c3d
```

## Subindo os containers

Para construir (caso necessário) e iniciar os containers:

```bash
IMAGE_TAG=$(git rev-parse --short HEAD) docker compose up --build -d
```

## Observações

* O banco de dados principal utiliza variáveis de ambiente configuráveis, com valores padrão definidos no `docker-compose.yml`.
* O banco de testes utiliza configurações fixas para garantir consistência durante a execução dos testes.
* Caso a variável `IMAGE_TAG` não seja informada, o Docker Compose utilizará a tag `latest` (desde que o `docker-compose.yml` esteja configurado com `${IMAGE_TAG:-latest}`).

## Derrubando os containers

Para interromper e remover os containers criados pelo Docker Compose, execute:

```bash
docker compose down
```

Caso também deseje remover os volumes associados (apagando os dados persistidos do banco de dados), utilize:

```bash
docker compose down -v
```

> **Atenção:** o comando com a opção `-v` remove os volumes do PostgreSQL e todos os dados armazenados neles.

