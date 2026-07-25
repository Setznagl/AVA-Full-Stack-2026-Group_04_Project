import { QuadraRepository, unicQuadraRepositoryInstance } from "../repository/QuadraRepository.ts";
import type { quadra } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

export class QuadraService {
    
    private quadraRepository: QuadraRepository;
    constructor(providedQuadraRepository: QuadraRepository) {
        this.quadraRepository = providedQuadraRepository;
    }

    async insertQuadra(provided_nome: string, provided_modalidade: string, provided_localizacao: string)
        :Promise<quadra | HttpError> {

        const data = await this.quadraRepository.insertQuadra(provided_nome, provided_modalidade, provided_localizacao);

        data instanceof HttpError && data.statusCode === 423
            ? data.message = "Não foi possível criar uma nova Quadra porque o nome já está em uso"
            : data;
        return data;
    }

    async findById(provided_id: number): Promise<quadra | null | HttpError> {
        return await this.quadraRepository.findById(provided_id);
    }

    async findByNome(provided_nome: string): Promise<quadra | null | HttpError> {
        return await this.quadraRepository.findByNome(provided_nome);
    }

    async findByModalidade(provided_modalidade: string): Promise<quadra[] | null | HttpError> {
        return await this.quadraRepository.findByModalidade(provided_modalidade);
    }

    async findAll(): Promise<quadra[] | HttpError> {
        return await this.quadraRepository.findAll();
    }

    async updateQuadra(provided_id: number, provided_nome: string, provided_modalidade: string, provided_localizacao: string)
        :Promise<quadra | HttpError> {

        const oldData = await this.quadraRepository.findById(provided_id);

        if (oldData instanceof HttpError) { return oldData; }
        if (oldData === null) {
            return new HttpError(404, "Impossível atualizar os dados da Quadra porque o registro informado não existe" , "service");
        }else{
            let checked_nome: string = oldData.nome;
            checked_nome !== provided_nome && provided_nome !== null ? checked_nome = provided_nome : checked_nome;
            let checked_modalidade: string = oldData.modalidade;
            checked_modalidade !== provided_modalidade && provided_modalidade !== null ? checked_modalidade = provided_modalidade : checked_modalidade;
            let checked_localizacao: string = oldData.localizacao;
            checked_localizacao !== provided_localizacao && provided_localizacao !== null ? checked_localizacao = provided_localizacao : checked_localizacao;

            return await this.quadraRepository.updateQuadra(
                provided_id,
                checked_nome,
                checked_modalidade,
                checked_localizacao
            );
        }
    }

    async deleteQuadra(provided_id: number): Promise<quadra | HttpError | null> {
        const data: quadra | HttpError = await this.quadraRepository.deleteQuadra(provided_id);

        data instanceof HttpError && data.statusCode === 404
            ? data.message = "Não foi possível deletar a Quadra porque o registro não foi encontrado"
            : data;
        return data;

    }


}

export const unicQuadraServiceInstance = new QuadraService(unicQuadraRepositoryInstance);