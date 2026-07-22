import { QuadraRepository, QuadraRepositoryInstance } from "../repository/QuadraRepository.ts";
import type { quadra } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

export class QuadraService {
    
    private quadraRepository: QuadraRepository = QuadraRepositoryInstance;
    
    constructor() {}

    private verificarErroFatal(respostaDoBanco: any) {
        if (respostaDoBanco instanceof HttpError) {
            throw respostaDoBanco;
        }
    }

    async insertQuadra(
        provided_nome: string, 
        provided_modalidade: string,
        provided_localizacao: string
    ): Promise<quadra | HttpError> {
            
        const resultadoInsert = await this.quadraRepository.insertQuadra(provided_nome, provided_modalidade, provided_localizacao);
        
        if (resultadoInsert instanceof HttpError && resultadoInsert.statusCode == 423) {
            resultadoInsert.message = "Quadra em Uso";
        }

        this.verificarErroFatal(resultadoInsert);
        
        return resultadoInsert as quadra;
    }

    async findAll(): Promise<quadra[] | HttpError> {
            
        const resultadoFindAll = await this.quadraRepository.findAll();  

        this.verificarErroFatal(resultadoFindAll);

        const listaCompleta = resultadoFindAll as quadra[];
        
        if (listaCompleta.length === 0) {
            throw new HttpError(404, "Nao encontrado", "service");
        }
        
        return listaCompleta;
    }

    async findById(provided_id: number): Promise<quadra | null | HttpError> {
            
        if (provided_id <= 0) {
           throw new HttpError(400, "ID Inválido!", "service");
        }

        const resultadoBusca = await this.quadraRepository.findById(provided_id);
            
        this.verificarErroFatal(resultadoBusca);

        if (resultadoBusca === null) {
            throw new HttpError(404, "Nao encontrado", "service");
        }

        return resultadoBusca as quadra;
    }

    async findByNome(provided_nome: string): Promise<quadra | null | Error> {
        
        const resultadoBusca = await this.quadraRepository.findByNome(provided_nome);

        this.verificarErroFatal(resultadoBusca);

        if (resultadoBusca === null) {
            throw new HttpError(404, "Nao encontrado", "service");
        }

        return resultadoBusca as quadra;
    }
    
    async findByModalidade(provided_modalidade: string): Promise<quadra[] | Error> {
        
        const resultadoBusca = await this.quadraRepository.findByModalidade(provided_modalidade);

        this.verificarErroFatal(resultadoBusca);
        
        const listaModalidade = resultadoBusca as quadra[];

        if (listaModalidade.length === 0) {
            throw new HttpError(404, "Nao encontrado", "service");
        }

        return listaModalidade;
    }

    async updateQuadra(
        provided_id: number,  
        provided_nome: string, 
        provided_modalidade: string,
        provided_localizacao: string
    ): Promise<quadra | HttpError> {
       
        if (provided_id <= 0) {
            throw new HttpError(400, "ID Inválido!", "service");
        }

        const quadraAntigaBusca = await this.quadraRepository.findById(provided_id);

        this.verificarErroFatal(quadraAntigaBusca);
        
        if (quadraAntigaBusca === null) {
            throw new HttpError(404, "Impossível atualizar: Quadra não encontrada", "service");
        }
        
        const quadraAntiga = quadraAntigaBusca as quadra;
        
        const checkedNome = provided_nome || quadraAntiga.nome;
        const checkedModalidade = provided_modalidade || quadraAntiga.modalidade;
        const checkedLocalizacao = provided_localizacao || quadraAntiga.localizacao;
       
        const resultadoUpdate = await this.quadraRepository.updateQuadra(
            provided_id,
            checkedNome,
            checkedModalidade,
            checkedLocalizacao
        );

        this.verificarErroFatal(resultadoUpdate);

        return resultadoUpdate as quadra;
    }

    async deleteQuadra(provided_id: number): Promise<quadra | HttpError | null> {
        
        if (provided_id <= 0) {
            throw new HttpError(400, "ID Inválido!", "service");
        }

        const resultadoDelete = await this.quadraRepository.deleteQuadra(provided_id);

        this.verificarErroFatal(resultadoDelete);

        if (resultadoDelete === null) {
            throw new HttpError(404, "Impossível deletar: Quadra não encontrada", "service");
        }

        return resultadoDelete as quadra;
    }
}

export const unicQuadraServiceInstance = new QuadraService();