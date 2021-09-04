// import { ApplicationConfig } from "types/application.types";
import express, { Application, Express } from "express";
import crossorigin from "cors";
import { Controller } from "../types/controller.types";
import cookieParser from "cookie-parser";
import { Middleware } from "../types/middleware.types";
import http, { createServer } from "http";
import HealthCheckController  from "../controller/healthCheck.controller";
import InvalidArgumentException from "../exceptions/invalidArgument.exception";
import errorMiddleware from "../middleware/errorMiddleware.middleware";
import Module from "@kdeoliveira/ioc";
import { Logger } from "../logger";
import helmet from "helmet";

export interface ApplicationConfig{
    app?: Application | Express;
    port: number;
    host: string;
    path?:string;
    cors?: crossorigin.CorsOptions | crossorigin.CorsOptionsDelegate | boolean;
    controllers: any[];
    middlewares?: Middleware[];
}

export default class HttpApplication{
    private app: Application;
    private server: http.Server;
    private port: number;
    private host: string;
    public path : () => string;

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
            middlewares,
        } = config;

        

        this.app = app ? app : express();
        this.port = port;
        this.host = host;
        this.path = path ? () => path : () => "/";

        this.app.use(helmet());

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

    private initializeControllers(controllers : any[]){
        controllers.push(HealthCheckController);

        let instances : Controller[] = [];

        controllers.forEach(
            (x) => instances.push(
                Module.container(x)
            )
        );


        instances.forEach(x => this.app.use(this.path(), x.router));
    }

    private initializeMiddlwares(middlewares? : Middleware[]){
        //Note that orders matter in middlewares
        this.app.use(express.json());
        this.app.use(cookieParser());
        // this.app.use(validationRequest());
        this.app.use(errorMiddleware());

        if(middlewares)
            middlewares.forEach(x => this.app.use(x))
    }

    public getServer(){
        return this.server;
    }

    public getApplication(){
        return this.app;
    }

    public listen(callback?: () => void) : void{
        Logger.debug(`HTTP Application has started on port ${this.port}`);
        this.server.listen(this.port, this.host, callback);
    }


}
