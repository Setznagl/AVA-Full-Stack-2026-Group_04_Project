export class HttpError extends Error {
    statusCode: number;
    layer: "middleware" | "controller" | "service" | "repository";
    message: string;
    constructor(statusCode: number, message: string, layer: "middleware" | "controller" | "service" | "repository") {
        super(message);

        this.message = message;
        this.name = "HttpError";
        this.statusCode = statusCode;
        this.layer = layer;

    }
}