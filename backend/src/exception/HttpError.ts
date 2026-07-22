/*
Erros podem ser lançados de diferentes fontes e não necessariamente todos tem os mesmos campos, então criaremos
uma classe de erro padronizada que vai nos permitir dar respostas mais concisas nas requisições HTTP e
também facilitar os nossos testes unitários.
*/
export class HttpError extends Error {
    statusCode: number;
    layer: "controller" | "service" | "repository";
    message: string;
    constructor(statusCode: number, message: string, layer: "controller" | "service" | "repository") {
        super(message);

        this.message = message;
        this.name = "HttpError";
        this.statusCode = statusCode;
        this.layer = layer;

    }
}