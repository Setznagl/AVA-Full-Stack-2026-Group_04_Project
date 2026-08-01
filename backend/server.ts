import express from "express";
import {router} from "./src/routes.ts";

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/swagger.ts';
import cors from "cors";

const port = process.env.PORT || 3000;
export const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {  console.log("Server started on port", port);  });

//URL para testar se a API está rodando corretamente na porta 3000
router.get("/v1/teste" , (_req, res) => {
    res.status(200).send({ message: "API operacional!" });
});