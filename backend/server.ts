import express from "express";
import {router} from "./routes.js";

const port = process.env.PORT || 3000;
export const app = express();

app.use(express.json());
app.use("/", router);
app.listen(port, () => {  console.log("Server started on port", port);  });

//URL para testar se a API está rodando corretamente na porta 3000
router.get("/v1/teste" , (_req, res) => {
    res.status(200).send({ message: "API operacional!" });
});