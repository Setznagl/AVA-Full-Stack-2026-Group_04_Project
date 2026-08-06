/*
 importando o PrismaClient para manipular os dados via ORM, deve ser importado
 da pasta generated após rodar npx prisma generate
*/
import {PrismaClient} from "../../generated/prisma/client.ts";
import {PrismaPg} from "@prisma/adapter-pg"; //Driver PostgreSQL pro Prisma
import "dotenv/config"; //Provendo acesso as variaveis de ambiente, sem isso ele nao consegue conectar

const adapter = new PrismaPg({connectionString: process.env.MOCK_DATABASE_URL});

const mock_Prisma_Client_Configurado = new PrismaClient(
    {
        //Carregando o Driver PostgreSQL no PrismaClient, e passando a string de conexao do banco de dados
        adapter: adapter,
        // log:["query" , "info" , "warn" , "error"] //Consultas SQL serao listadas no console em tempo real
    }
);

//Exportando meu PrismaClient configurado
export default mock_Prisma_Client_Configurado;