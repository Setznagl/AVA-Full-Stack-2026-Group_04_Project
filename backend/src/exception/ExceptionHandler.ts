import {HttpError} from "./HttpError.ts";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";

class ExceptionHandler {

    handle(exception: any , layer: "repository" | "service" | "controller"):HttpError {

        let treatedException: HttpError = new HttpError(500, exception.message, layer);

        if(exception instanceof PrismaClientKnownRequestError){
            switch (exception.code) {
                case 'P2002':
                    treatedException = new HttpError(423, `Registro já existe.`, layer);
                    break;
                case 'P2025':
                    treatedException = new HttpError(404, `Registro não encontrado.`, layer);
                    break;
                case 'P2003':
                    treatedException = new HttpError(404, `Registro relacionado não encontrado.`, layer);
                    break;
                case 'P2004':
                    treatedException = new HttpError(400, `Os dados informados violam uma regra do banco.`, layer);
                    break;
            }
        }

        return treatedException;
    }

}

export const exceptionHandler = new ExceptionHandler();
