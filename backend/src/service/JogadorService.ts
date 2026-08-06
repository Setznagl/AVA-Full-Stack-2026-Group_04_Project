import {JogadorRepository, unicJogadorRepositoryInstance} from "../repository/JogadorRepository.ts";
import type {jogador} from "../generated/prisma/client.ts";
import {HttpError} from "../exception/HttpError.ts";

export class JogadorService {

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

    async findByID(provided_id: number):Promise<jogador | HttpError | null  > {
        return await this.jogadorRepository.findById(provided_id);
    }

    async findByEmail(email: string): Promise<jogador | HttpError | null> {
        return await this.jogadorRepository.findByEmail(email);
    }

    async findAll():Promise<jogador[] | HttpError | null > {
        return await this.jogadorRepository.findAll();
    }

    async updateJogador(provided_id: number, provided_nome: string, provided_email: string, provided_telefone: string, provided_senha: string):
        Promise<jogador | HttpError> {

        const oldData: jogador | HttpError | null = await this.jogadorRepository.findById(provided_id);

            if (oldData instanceof HttpError) {  return  oldData  }
            if (oldData === null) {
                return new HttpError(404, "Impossível atualizar os dados do jogador porque o registro informado não existe" , "service");
            } else{
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