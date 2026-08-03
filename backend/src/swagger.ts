import swaggerJsdoc from 'swagger-jsdoc';
import fs from "node:fs";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Reservas',
            version: '1.0.0',
            description: 'Documentação da API de reservas de quadras',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Ambiente local' },
        ],
        components: {
            schemas: {
                Reserva: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        data: { type: 'string', format: 'date-time' },
                        horario_inicio: { type: 'string', format: 'date-time' },
                        horario_fim: { type: 'string', format: 'date-time' },
                        quadra_id: { type: 'integer' },
                        jogador_id: { type: 'integer' },
                    },
                },
                Jogador: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', example: 'joao.silva@example.com' },
                        telefone: { type: 'string', example: '(11) 99999-9999' },
                        senha: { type: 'string', example: 'senha123' },
                    },
                },
                Quadra: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'Quadra A' },
                        localizacao: { type: 'string', example: 'Rua das Flores, 123' },
                        modalidade: { type: 'string', example: 'Futebol' },
                    }
                },
                HttpError: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'integer', example: 400 },
                        message: { type: 'string', example: 'Invalid body parameter' },
                    },
                },
                NotFound: {
                    type: 'object',
                },
            },
        },
    },
    // aponta pros arquivos onde estarão os comentários @swagger
    apis: ['./src/routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

fs.writeFileSync(
    "./swagger.json",
    JSON.stringify(swaggerSpec, null, 2)
);

console.log("OpenAPI gerado com sucesso!");