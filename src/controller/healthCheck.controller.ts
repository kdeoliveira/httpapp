import { Request } from "express";
import { Response } from "express-serve-static-core";
import ControllerRoute from "../ioc/controller";
import BaseController from "./base.controller"



@ControllerRoute({
    path: "/.healthCheck"
})
export default class HealthCheckController extends BaseController{
    constructor(public path : string){
        super();
    }

    protected routing() : void{
        this.router.get(this.path, this.healthStatus)
    }

    private async healthStatus(request: Request, response: Response){
        response.status(200).send('OK');
    }
}