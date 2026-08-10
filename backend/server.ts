import express from "express";
import cookieParser from "cookie-parser";
import {router} from "./src/routes.ts";
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/swagger.ts';

const port = process.env.PORT || 3000;
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Substitua pelo domínio do seu front-end
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use("/", router);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            persistAuthorization: true,
            requestInterceptor: (req:any) => {
                req.credentials = 'include';
                return req;
            },
            withCredentials: true
        }
    })
);
app.listen(port, () => {  console.log("Server started on port", port);  });

//URL para testar se a API está rodando corretamente na porta 3000
router.get("/v1/teste" , (_req, res) => {
    res.status(200).send({ message: "API operacional!" });
});