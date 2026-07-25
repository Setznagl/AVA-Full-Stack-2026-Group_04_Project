import {Router} from "express";
import {unicJogadorControllerInstance} from "./src/controller/JogadorController.ts";
import {unicReservaController} from "./src/controller/ReservaController.ts"
import {unicQuadraController} from "./src/controller/quadracontroller.ts";
export const router = Router();

router.post("/v1/jogador" , unicJogadorControllerInstance.insertJogador.bind(unicJogadorControllerInstance))
router.get("/v1/jogador/many" , unicJogadorControllerInstance.findAll.bind(unicJogadorControllerInstance))
router.get("/v1/jogador/:id", unicJogadorControllerInstance.findByID.bind(unicJogadorControllerInstance))
router.get("/v1/jogador", unicJogadorControllerInstance.findByEmail.bind(unicJogadorControllerInstance))
router.put("/v1/jogador", unicJogadorControllerInstance.updateJogador.bind(unicJogadorControllerInstance))
router.delete("/v1/jogador/:id", unicJogadorControllerInstance.deleteJogador.bind(unicJogadorControllerInstance))


router.post("/v1/reserva", unicReservaController.insertReserva.bind(unicReservaController))
router.get("/v1/reserva/many", unicReservaController.findAll.bind(unicReservaController))
router.get("/v1/reserva/filtro-data", unicReservaController.findByData.bind(unicReservaController))
router.get("/v1/reserva/jogador/:jogador_id", unicReservaController.findByJogadorID.bind(unicReservaController))
router.get("/v1/reserva/quadra/:quadra_id", unicReservaController.findByQuadraID.bind(unicReservaController))
router.get("/v1/reserva/:id", unicReservaController.findByID.bind(unicReservaController))
router.put("/v1/reserva/:id", unicReservaController.updateReserva.bind(unicReservaController))
router.delete("/v1/reserva/:id", unicReservaController.deleteReserva.bind(unicReservaController))

router.post("/v1/jogador" , unicJogadorControllerInstance.insertJogador.bind(unicJogadorControllerInstance))
router.get("/v1/jogador/many" , unicJogadorControllerInstance.findAll.bind(unicJogadorControllerInstance))
router.get("/v1/jogador/:id", unicJogadorControllerInstance.findByID.bind(unicJogadorControllerInstance))
router.get("/v1/jogador", unicJogadorControllerInstance.findByEmail.bind(unicJogadorControllerInstance))
router.put("/v1/jogador", unicJogadorControllerInstance.updateJogador.bind(unicJogadorControllerInstance))
router.delete("/v1/jogador/:id", unicJogadorControllerInstance.deleteJogador.bind(unicJogadorControllerInstance))

router.post("/v1/quadra", unicQuadraController.insertQuadra.bind(unicQuadraController));
router.get("/v1/quadra/many", unicQuadraController.findAll.bind(unicQuadraController));
router.get("/v1/quadra/:id", unicQuadraController.findById.bind(unicQuadraController));
router.get("/v1/quadra/nome/:nome", unicQuadraController.findByNome.bind(unicQuadraController));
router.get("/v1/quadra/modalidade/:modalidade", unicQuadraController.findByModalidade.bind(unicQuadraController));
router.put("/v1/quadra", unicQuadraController.updateQuadra.bind(unicQuadraController));
router.delete("/v1/quadra/:id", unicQuadraController.deleteQuadra.bind(unicQuadraController));
