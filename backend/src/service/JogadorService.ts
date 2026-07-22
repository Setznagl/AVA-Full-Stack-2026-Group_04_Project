import {JogadorRepository, unicJogadorRepositoryInstance} from "../repository/JogadorRepository.ts";
import type {jogador} from "../../src/generated/prisma/client.ts";
import {HttpError} from "../../src/exception/HttpError.ts";

export class JogadorService {

    //Injetando a dependência: Service depende das funções de operação no banco em Repository
    private jogadorRepository: JogadorRepository;
    constructor(providedRepository: JogadorRepository) {
        this.jogadorRepository = providedRepository;
    }

    async insertJogador(provided_nome: string, provided_email: string, provided_telefone: string, provided_senha: string)
        : Promise<jogador | HttpError> {

        const data: jogador | HttpError = await this.jogadorRepository.insertJogador(provided_nome, provided_email, provided_telefone, provided_senha);

        data instanceof HttpError && data.statusCode === 423
            ? data.message = "Não foi possível criar um novo jogador porque o email já está em uso"
            : data;
        return data;

    }

    async findByEmail(email: string): Promise<jogador | HttpError | null> {
        return await this.jogadorRepository.findByEmail(email);
    }

    async findByID(provided_id: number):Promise<jogador | HttpError | null  > {
        return await this.jogadorRepository.findByID(provided_id);
    }

    async findAll():Promise<jogador[] | HttpError | null > {
        return await this.jogadorRepository.findAll();
    }

    async updateJogador(
        provided_id: number,
        provided_nome: string,
        provided_email: string,
        provided_telefone: string,
        provided_senha: string
    ):Promise<jogador | HttpError> {

        //Confirmando se os dados que recebemos são iguais aos do registro no banco, se forem não precisamos mudar
        const oldData: jogador | HttpError | null = await this.jogadorRepository.findByID(provided_id);

            if (oldData instanceof HttpError) {  return  oldData  }

            if (oldData === null) {
                return new HttpError(400, "Impossível atualizar os dados do jogador porque o registro informado não existe" , "service");
            }else{
                /*
                confirmamos que o dado a ser atualizado não é nulo (registro ativo) e que o banco efetuou a consulta sem erros,
                agora precisamos confirmar quais dados do usuário foram enviados para alteração comparando com os dados antigos
                que o banco trouxe
                */
                let checked_nome: string = oldData.nome
                checked_nome !== provided_nome && provided_nome !== null ? checked_nome = provided_nome : checked_nome;
                let checked_email: string = oldData.email
                checked_email !== provided_email && provided_email !== null ? checked_email = provided_email : checked_email;
                let checked_telefone: string = oldData.telefone
                checked_telefone !== provided_telefone && provided_telefone !== null ? checked_telefone = provided_telefone : checked_telefone;
                let checked_senha: string = oldData.senha
                checked_senha !== provided_senha && provided_senha !== null ? checked_senha = provided_senha : checked_senha;

                return await this.jogadorRepository.updateJogador(
                    provided_id,
                    checked_nome,
                    checked_email,
                    checked_telefone,
                    checked_senha
                );

            }

    }

    async deleteJogador(provided_id: number): Promise<jogador | HttpError> {
        const data: jogador | HttpError = await this.jogadorRepository.deleteJogador(provided_id);

        data instanceof HttpError && data.statusCode === 404
            ? data.message = "Não foi possível deletar o jogador porque o registro não foi encontrado"
            : data ;
        return data;
    }

}

export const unicJogadorServiceInstance = new JogadorService(unicJogadorRepositoryInstance);