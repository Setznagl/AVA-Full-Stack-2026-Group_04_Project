import {HttpError} from "../../exception/HttpError.ts";
import jwt, {type JwtPayload} from "jsonwebtoken";
import express from "express";
import "dotenv/config";

export interface AuthenticatedRequest extends express.Request {
    user?: JwtPayload;
}

export function authMiddleware(
    request: AuthenticatedRequest,
    response: express.Response,
    next: express.NextFunction
) {
    const authHeader = request.headers.authorization;
    console.log("Received headers", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json(new HttpError(401, "Access token is required", "middleware"));
    }

    const accessToken = authHeader.split(" ")[1];

    try {
        if(accessToken !== undefined){
            request.user = jwt.verify(accessToken, process.env.ACCESS_SECRET_JWT as string) as JwtPayload;
        }
        return next();
    } catch (error) {
        return response.status(401).json(new HttpError(401, "Invalid or expired access token", "middleware"));
    }
}
