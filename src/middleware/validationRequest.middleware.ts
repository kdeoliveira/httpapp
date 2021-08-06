import { Middleware } from "../types/middleware.types";
import {NextFunction, Request, Response} from "express";
import {AnySchema} from "yup";
import HttpException from "exceptions/http.exception";
import { EXCPETION_STATUS } from "exceptions/enum.exception";


//Validation request througn YUP
const validationRequest : Middleware = (schema : AnySchema) => async (_, request:  Request, response: Response, next: NextFunction) => {
    try{
        await schema.validate({
            body: request.body,
            query: request.query,
            params: request.params
        });

        return next();
    }
    catch(err : any){
        return next(new HttpException(EXCPETION_STATUS.NOT_FOUND, err.errors));
    }
}


export default validationRequest;