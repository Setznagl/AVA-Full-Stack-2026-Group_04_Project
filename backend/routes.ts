import { Router } from "express";
import { unicJogadorController } from "./src/controller/JogadorController.js";
import { unicQuadraController } from "./src/controller/quadracontroller.ts";
export const router = Router();

/* Aqui estamos mapeando as rotas HTTP:
Usando router.get ou app.get por exemplo ele tem como parâmetro de entrada uma string que é o path da URL
e uma função com dois argumentos (req , res) => { ... }, então se criarmos e exportarmos uma funcao ou classe que tenha
uma funcao dentro dela que recebe request e response como argumentos, podemos passar essa função como
segundo argumento do router.get ou app.get e tratar toda a lógica da solicitação em arquivos e camadas isoladas.
 */


router.post("/v1/jogador" , unicJogadorController.insertJogador.bind(unicJogadorController))
router.get("/v1/jogador/many" , unicJogadorController.findAll.bind(unicJogadorController))
router.get("/v1/jogador/:id", unicJogadorController.findByID.bind(unicJogadorController))
router.get("/v1/jogador", unicJogadorController.findByEmail.bind(unicJogadorController))
router.put("/v1/jogador", unicJogadorController.updateJogador.bind(unicJogadorController))
router.delete("/v1/jogador/:id", unicJogadorController.deleteJogador.bind(unicJogadorController))


router.post("/v1/quadra", unicQuadraController.insertQuadra.bind(unicQuadraController));
router.get("/v1/quadra/many", unicQuadraController.findAll.bind(unicQuadraController));
router.get("/v1/quadra/:id", unicQuadraController.findById.bind(unicQuadraController));
router.get("/v1/quadra/nome/:nome", unicQuadraController.findByNome.bind(unicQuadraController));
router.get("/v1/quadra/modalidade/:modalidade", unicQuadraController.findByModalidade.bind(unicQuadraController));
router.put("/v1/quadra", unicQuadraController.updateQuadra.bind(unicQuadraController));
router.delete("/v1/quadra/:id", unicQuadraController.deleteQuadra.bind(unicQuadraController));