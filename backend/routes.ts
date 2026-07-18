import {Router} from "express";
import {JogadorController} from "./src/controller/JogadorController.ts";
export const router = Router();
/* Aqui estamos mapeando as rotas HTTP:
Usando router.get ou app.get por exemplo ele tem como parâmetro de entrada uma string que é o path da URL
e uma função com dois argumentos (req , res) => { ... }, então se criarmos e exportarmos uma funcao ou classe que tenha
uma funcao dentro dela que recebe request e response como argumentos, podemos passar essa função como
segundo argumento do router.get ou app.get e tratar toda a lógica da solicitação em arquivos e camadas isoladas.
 */
const jogadorController = new JogadorController();
router.post("/jogador" , jogadorController.insertJogador.bind(jogadorController) );

