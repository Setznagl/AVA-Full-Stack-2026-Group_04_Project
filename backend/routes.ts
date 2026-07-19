import {Router} from "express";
import {unicJogadorController} from "./src/controller/JogadorController.ts";
export const router = Router();
/* Aqui estamos mapeando as rotas HTTP:
Usando router.get ou app.get por exemplo ele tem como parâmetro de entrada uma string que é o path da URL
e uma função com dois argumentos (req , res) => { ... }, então se criarmos e exportarmos uma funcao ou classe que tenha
uma funcao dentro dela que recebe request e response como argumentos, podemos passar essa função como
segundo argumento do router.get ou app.get e tratar toda a lógica da solicitação em arquivos e camadas isoladas.
 */

router.post("/jogador" , unicJogadorController.insertJogador.bind(unicJogadorController))
router.get("/jogador/many" , unicJogadorController.findAll.bind(unicJogadorController))
router.get("/jogador/:id", unicJogadorController.findByID.bind(unicJogadorController))
router.get("/jogador", unicJogadorController.findByEmail.bind(unicJogadorController))
router.put("/jogador", unicJogadorController.updateJogador.bind(unicJogadorController))
router.delete("/jogador/:id", unicJogadorController.deleteJogador.bind(unicJogadorController))