import {HttpError} from "./HttpError.ts";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";

class ExceptionHandler {

    handle(exception: any , layer: "repository" | "service" | "controller"):HttpError {

        let treatedException: HttpError = new HttpError(500, exception, layer);

        if(exception instanceof PrismaClientKnownRequestError){
            switch (exception.code) {
                case 'P2002':
                    treatedException = new HttpError(423, `Register already exists.`, layer);
                    break;
                case 'P2025':
                    treatedException = new HttpError(404, `Register not found.`, layer);
                    break;
                case 'P2003':
                    treatedException = new HttpError(404, `Register not found.`, layer);
                    break;
            }
        }

        return treatedException;
    }

}

export const exceptionHandler = new ExceptionHandler();
