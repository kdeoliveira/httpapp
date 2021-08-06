// import { ApplicationConfig } from "types/application.types";
import express, { Application, Express } from "express";
import crossorigin from "cors";
import { Controller } from "types/controller.types";

import { Middleware } from "types/middleware.types";
import { createServer, Server } from "http";
import HealthCheckController  from "../controller/healthCheck.controller";
import InvalidArgumentException from "../exceptions/invalidArgument.exception";
import errorMiddleware from "../middleware/errorMiddleware.middleware";
import validationRequest from "../middleware/validationRequest.middleware";

export interface ApplicationConfig{
    app?: Application | Express;
    port: number;
    host: string;
    path?:string;
    cors?: crossorigin.CorsOptions | crossorigin.CorsOptionsDelegate | boolean;
    controllers: Controller[];
    middlewares?: Middleware[];
}



export default class HttpApplication{
    private app: Application;
    private server: Server;
    private port: number;
    private host: string;
    private path : string;

    constructor(config : ApplicationConfig){
        if(!config)
            throw new InvalidArgumentException();

        const {
            app,
            port,
            host,
            path,
            cors,
            controllers,
            middlewares
        } = config;

        this.app = app ? app : express();
        this.port = port;
        this.host = host;
        this.path = path ? path : "/";

        if(cors === true){
            this.app.use(crossorigin());
        }else if(cors && cors instanceof Object){
            this.app.use(crossorigin(cors));
        }

        if(!Array.isArray(controllers))
            throw new InvalidArgumentException("Controlller must be provided as an array");
        if(middlewares && !Array.isArray(middlewares))
            throw new InvalidArgumentException("Middlewares must be provided as an array");

        this.initializeControllers(controllers);
        this.initializeMiddlwares(middlewares);    
        
        this.server = createServer(this.app);

    }

    private initializeControllers(controllers : Controller[]){
        
        this.app.use(new HealthCheckController().router);

        controllers.forEach(x => this.app.use(this.path, x.router));
    }

    private initializeMiddlwares(middlewares? : Middleware[]){
        //Note that orders matter in middlewares
        this.app.use(express.json());
        this.app.use(validationRequest());
        this.app.use(errorMiddleware());

        if(middlewares)
            middlewares.forEach(x => this.app.use(x))
    }

    public getServer(){
        return this.server;
    }

    public listen(callback : () => void){
        this.server.listen(this.port, this.host, callback);
    }


}
