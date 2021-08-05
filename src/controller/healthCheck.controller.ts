import { Request } from "express";
import { Response } from "express-serve-static-core";
import BaseController from "./base.controller"



export default class HealthCheckController extends BaseController{
    constructor(){
        super({uri: "/.healthCheck"});
    }

    protected routing(uri: string) : void{
        this.router.get(uri, this.healthStatus)
    }

    private async healthStatus(request: Request, response: Response){
        response.status(200).send('OK');
    }
}