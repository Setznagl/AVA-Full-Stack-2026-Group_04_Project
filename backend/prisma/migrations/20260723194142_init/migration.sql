-- CreateTable
CREATE TABLE "jogador" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(150) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(150) NOT NULL,

    CONSTRAINT "jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quadra" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "modalidade" VARCHAR(50) NOT NULL,
    "localizacao" VARCHAR(150) NOT NULL,

    CONSTRAINT "quadra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" SERIAL NOT NULL,
    "jogador_id" INTEGER NOT NULL,
    "quadra_id" INTEGER NOT NULL,
    "data" DATE NOT NULL,
    "horario_inicio" TIME(6) NOT NULL,
    "horario_fim" TIME(6) NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jogador_email_key" ON "jogador"("email");

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "fk_reserva_jogador" FOREIGN KEY ("jogador_id") REFERENCES "jogador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "fk_reserva_quadra" FOREIGN KEY ("quadra_id") REFERENCES "quadra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
