import {JogadorRepository, unicJogadorRepositoryInstance} from "../repository/JogadorRepository.ts";
import type {jogador} from "../generated/prisma/client.ts";

export class JogadorService {

    private jogadorRepository: JogadorRepository = unicJogadorRepositoryInstance;
    constructor() {

    }

    async insertJogador(provided_nome: string, provided_email: string, provided_telefone: string, provided_senha: string)
        :Promise<jogador | Error > {
            // Busca por um jogador com o email fornecido
            let dataOutput: Promise<jogador | Error | null> = this.jogadorRepository.findByEmail(provided_email);
                if(dataOutput instanceof Error){
                    //Verifica se é um Erro que veio durante o processamento no Repository
                    throw dataOutput
                }
                if(
                     /*
                     Verifica se dataOutput é um objeto do tipo jogador. Se dataOutput é um jogador então já existe
                     um registro no banco e seguindo a lógica de tipagem da função ":Promise<jogador | Error >" só
                     podemos retornar um usuário (aceitaria tanto esse usuário pesquisado quanto o usuário criado para
                     valor de retorno, então é necessário atenção) ou um erro.
                     */
                    typeof dataOutput === "object" &&
                    dataOutput !== null &&
                    "id" in dataOutput &&
                    "email" in dataOutput &&
                    "telefone" in dataOutput &&
                    "senha" in dataOutput
                ){
                    //O E-mail já está em uso, então não podemos criar um novo registro com o mesmo e-mail. Retornamos um erro.
                    throw new Error("226", {cause: "Email já cadastrado"});
                }
            // Se chegou até aqui, o e-mail não está em uso, então podemos criar e retornar um novo registro.
            return await this.jogadorRepository.insertJogador(provided_nome, provided_email, provided_telefone, provided_senha);
        }


}

export const unicJogadorServiceInstance = new JogadorService();