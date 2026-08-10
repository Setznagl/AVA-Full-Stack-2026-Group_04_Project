import {Router} from "express";
import {unicJogadorControllerInstance} from "./controller/JogadorController.ts";
import {unicReservaControllerInstance} from "./controller/ReservaController.ts";
import {unicQuadraControllerInstance} from "./controller/QuadraController.ts";
import {unicLoginControllerInstance} from "./security/auth/LoginController.ts";
import {authMiddleware} from "./security/middleware/TokenValidator.ts";
export const router = Router();

/**
 * @swagger
 * /v1/jogador:
 *   post:
 *     summary: Cria um novo jogador
 *     tags: [Jogadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, telefone, senha]
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       423:
 *         description: Email já está em uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.post('/v1/jogador' , unicJogadorControllerInstance.insertJogador.bind(unicJogadorControllerInstance));

/**
 * @swagger
 * /v1/jogador/{id}:
 *   get:
 *     summary: Obtém um jogador por ID
 *     tags: [Jogadores]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     responses:
 *       200:
 *         description: Jogador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/jogador/:id', authMiddleware , unicJogadorControllerInstance.findByID.bind(unicJogadorControllerInstance));

/**
 * @swagger
 * /v1/jogador/email/{email}:
 *   get:
 *     summary: Obtém um jogador por email
 *     tags: [Jogadores]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email do jogador
 *     responses:
 *       200:
 *         description: Jogador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/jogador/email/:email', authMiddleware, unicJogadorControllerInstance.findByEmail.bind(unicJogadorControllerInstance));

/**
 * @swagger
 * /v1/jogador-many:
 *   get:
 *     summary: Obtém todos os jogadores
 *     tags: [Jogadores]
 *     security:
 *       - AccessToken: []
 *     responses:
 *       200:
 *         description: Lista de jogadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jogador'
 */
router.get('/v1/jogador-many', authMiddleware, unicJogadorControllerInstance.findAll.bind(unicJogadorControllerInstance));

/**
 * @swagger
 * /v1/jogador/{id}:
 *   put:
 *     summary: Atualiza um jogador existente
 *     tags: [Jogadores]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       202:
 *         description: Jogador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       400:
 *         description: Parâmetro de rota ou body inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.put('/v1/jogador/:id', authMiddleware ,unicJogadorControllerInstance.updateJogador.bind(unicJogadorControllerInstance));

/**
 * @swagger
 * /v1/jogador/{id}:
 *   delete:
 *     summary: Deleta um jogador
 *     tags: [Jogadores]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     responses:
 *       204:
 *         description: Jogador deletado com sucesso
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.delete('/v1/jogador/:id', authMiddleware, unicJogadorControllerInstance.deleteJogador.bind(unicJogadorControllerInstance));



/**
 * @swagger
 * /v1/quadra:
 *   post:
 *     summary: Cria uma nova quadra
 *     tags: [Quadras]
 *     security:
 *       - AccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, modalidade, localizacao]
 *             properties:
 *               nome:
 *                 type: string
 *               modalidade:
 *                 type: string
 *               localizacao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Quadra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quadra'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       423:
 *         description: Nome já está em uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.post('/v1/quadra', authMiddleware, unicQuadraControllerInstance.insertQuadra.bind(unicQuadraControllerInstance));

/**
 * @swagger
 * /v1/quadra/{id}:
 *   get:
 *     summary: Obtém uma quadra por ID
 *     tags: [Quadras]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da quadra
 *     responses:
 *       200:
 *         description: Quadra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quadra'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Quadra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/quadra/:id', authMiddleware , unicQuadraControllerInstance.findById.bind(unicQuadraControllerInstance));

/**
 * @swagger
 * /v1/quadra/nome/{nome}:
 *   get:
 *     summary: Obtém uma quadra por nome
 *     tags: [Quadras]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da quadra
 *     responses:
 *       200:
 *         description: Quadra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quadra'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Quadra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/quadra/nome/:nome', authMiddleware ,unicQuadraControllerInstance.findByNome.bind(unicQuadraControllerInstance));

/**
 * @swagger
 * /v1/quadra/modalidade/{modalidade}:
 *   get:
 *     summary: Obtém quadras por modalidade
 *     tags: [Quadras]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: modalidade
 *         required: true
 *         schema:
 *           type: string
 *         description: Modalidade da quadra
 *     responses:
 *       200:
 *         description: Lista de quadras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quadra'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Quadra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/quadra/modalidade/:modalidade', authMiddleware , unicQuadraControllerInstance.findByModalidade.bind(unicQuadraControllerInstance));

/**
 * @swagger
 * /v1/quadra-many:
 *   get:
 *     summary: Obtém todas as quadras
 *     tags: [Quadras]
 *     security:
 *       - AccessToken: []
 *     responses:
 *       200:
 *         description: Lista de quadras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quadra'
 */
router.get('/v1/quadra-many', authMiddleware , unicQuadraControllerInstance.findAll.bind(unicQuadraControllerInstance));

/**
 * @swagger
 * /v1/quadra/{id}:
 *   put:
 *     summary: Atualiza uma quadra existente
 *     tags: [Quadras]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da quadra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               modalidade:
 *                 type: string
 *               localizacao:
 *                 type: string
 *     responses:
 *       202:
 *         description: Quadra atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quadra'
 *       400:
 *         description: Parâmetro de rota ou body inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Quadra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.put('/v1/quadra/:id', authMiddleware , unicQuadraControllerInstance.updateQuadra.bind(unicQuadraControllerInstance));

/**
 * @swagger
 * /v1/quadra/{id}:
 *   delete:
 *     summary: Deleta uma quadra
 *     tags: [Quadras]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da quadra
 *     responses:
 *       204:
 *         description: Quadra deletada com sucesso
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Quadra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.delete('/v1/quadra/:id', authMiddleware , unicQuadraControllerInstance.deleteQuadra.bind(unicQuadraControllerInstance));



/**
 * @swagger
 * /v1/reserva:
 *   post:
 *     summary: Cria uma nova reserva
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jogador_id, quadra_id, data, horarioInicio, horarioFim]
 *             properties:
 *               jogador_id:
 *                 type: integer
 *               quadra_id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date-time
 *               horarioInicio:
 *                 type: string
 *                 format: date-time
 *               horarioFim:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       409:
 *         description: Conflito com outros dados no banco
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.post('/v1/reserva', authMiddleware , unicReservaControllerInstance.insertReserva.bind(unicReservaControllerInstance));

/**
 * @swagger
 * /v1/reserva/{id}:
 *   get:
 *     summary: Obtém uma reserva por ID
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/reserva/:id', authMiddleware , unicReservaControllerInstance.findById.bind(unicReservaControllerInstance));

/**
 * @swagger
 * /v1/reserva/jogador/{jogador_id}:
 *   get:
 *     summary: Obtém reservas por jogador ID
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: jogador_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Reserva não encontreada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/reserva/jogador/:jogador_id', authMiddleware , unicReservaControllerInstance.findByJogadorId.bind(unicReservaControllerInstance));

/**
 * @swagger
 * /v1/reserva/quadra/{quadra_id}:
 *   get:
 *     summary: Obtém reservas por quadra ID
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: quadra_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da quadra
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Reserva não encontreada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/reserva/quadra/:quadra_id', authMiddleware , unicReservaControllerInstance.findByQuadraId.bind(unicReservaControllerInstance));

/**
 * @swagger
 * /v1/reserva/data/{data}:
 *   get:
 *     summary: Obtém reservas por data
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data da reserva
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Reserva não encontreada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.get('/v1/reserva/data/:data', authMiddleware , unicReservaControllerInstance.findByData.bind(unicReservaControllerInstance));

/**
 * @swagger
 * /v1/reserva-many:
 *   get:
 *     summary: Obtém todas as reservas
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 */
router.get('/v1/reserva-many', authMiddleware , unicReservaControllerInstance.findAll.bind(unicReservaControllerInstance));

/**
 * @swagger
 * /v1/reserva/{id}:
 *   put:
 *     summary: Atualiza uma reserva existente
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [data, horario_inicio, horario_fim]
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *               horario_inicio:
 *                 type: string
 *                 format: date-time
 *               horario_fim:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       202:
 *         description: Reserva atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Parâmetro de rota ou body inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       409:
 *         description: Conflito de horário (quadra ou jogador já reservados)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.put('/v1/reserva/:id', authMiddleware , unicReservaControllerInstance.updateReserva.bind(unicReservaControllerInstance));

/**
 * @swagger
 * /v1/reserva/{id}:
 *   delete:
 *     summary: Deleta uma reserva
 *     tags: [Reservas]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       204:
 *         description: Reserva deletada com sucesso
 *       400:
 *         description: Parâmetro de rota inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.delete('/v1/reserva/:id', authMiddleware , unicReservaControllerInstance.deleteReserva.bind(unicReservaControllerInstance));


/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Autentica um jogador e gera tokens de acesso
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token enviado em cookie HttpOnly
 *             schema:
 *               type: string
 *       401:
 *         description: Email ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.post('/v1/login', unicLoginControllerInstance.sign.bind(unicLoginControllerInstance));

/**
 * @swagger
 * /v1/refresh:
 *   post:
 *     summary: Gera um novo access token a partir do refresh token
 *     description: Requer o cookie HttpOnly `refreshToken`.
 *     tags: [Login]
 *     responses:
 *       200:
 *         description: Novo access token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             description: Novo refresh token enviado em cookie HttpOnly.
 *             schema:
 *               type: string
 *       401:
 *         description: Refresh token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
router.post('/v1/refresh', unicLoginControllerInstance.refresh.bind(unicLoginControllerInstance));