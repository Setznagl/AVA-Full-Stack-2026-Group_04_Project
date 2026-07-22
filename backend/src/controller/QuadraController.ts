import express from "express";
import { QuadraService, unicQuadraServiceInstance } from "../service/quadraService.ts";
import type { quadra } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

export class QuadraController {

    private quadraService: QuadraService;
    
    constructor(provided_quadraService: QuadraService = unicQuadraServiceInstance) {
        this.quadraService = provided_quadraService;
    }

    async insertQuadra(request: express.Request, response: express.Response): Promise<void> {
        try {
            const { nome, modalidade, localizacao } = request.body;
            const requestOutput = await this.quadraService.insertQuadra(nome, modalidade, localizacao);
            
            response.status(201).json(requestOutput);
        } catch (error: any) {
            response.status(error.statusCode || 500).json(error);
        }
    }

    async findAll(_request: express.Request, response: express.Response): Promise<void> {
        try {
            const requestOutput = await this.quadraService.findAll();
            
            response.status(200).json(requestOutput);
        } catch (error: any) {
            response.status(error.statusCode || 500).json(error);
        }
    }

    async findById(request: express.Request, response: express.Response): Promise<void> {
        try {
            const { id } = request.params;
            const requestOutput = await this.quadraService.findById(Number(id));
            
            response.status(200).json(requestOutput);
        } catch (error: any) {
            response.status(error.statusCode || 500).json(error);
        }
    }

    async findByNome(request: express.Request, response: express.Response): Promise<void> {
        try {
            const { nome } = request.params;
            const requestOutput = await this.quadraService.findByNome(nome as string);
            
            response.status(200).json(requestOutput);
        } catch (error: any) {
            response.status(error.statusCode || 500).json(error);
        }
    }

    async findByModalidade(request: express.Request, response: express.Response): Promise<void> {
        try {
            const { modalidade } = request.params;
            const requestOutput = await this.quadraService.findByModalidade(modalidade as string);
            
            response.status(200).json(requestOutput);
        } catch (error: any) {
            response.status(error.statusCode || 500).json(error);
        }
    }

    async updateQuadra(request: express.Request, response: express.Response): Promise<void> {
        try {
            const { id, nome, modalidade, localizacao } = request.body;
            const requestOutput = await this.quadraService.updateQuadra(Number(id), nome, modalidade, localizacao);
            
            response.status(200).json(requestOutput);
        } catch (error: any) {
            response.status(error.statusCode || 500).json(error);
        }
    }

    async deleteQuadra(request: express.Request, response: express.Response): Promise<void> {
        try {
            const { id } = request.params;
            await this.quadraService.deleteQuadra(Number(id));
            
            response.status(204).send();
        } catch (error: any) {
            response.status(error.statusCode || 500).json(error);
        }
    }
}

export const unicQuadraController = new QuadraController();