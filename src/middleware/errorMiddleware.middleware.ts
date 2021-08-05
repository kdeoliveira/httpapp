import { EXCPETION_STATUS } from "../exceptions/enum.exception";
import HttpException from "../exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import { Middleware } from "types/middleware.types";
import {Logger} from "../logger";



const errorMiddleware : Middleware = () => (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const name = error.name || EXCPETION_STATUS.INTERNAL_ERROR
    const message = error.message || `An error has occured on file ${error.file}`;

    Logger.error(error);

    

    response.status(status).send({name, status, message})
}

export default errorMiddleware;