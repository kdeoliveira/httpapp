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
import { Logger } from "../logger";
import helmet from "helmet";
import { ContentSecurityPolicyOptions } from "helmet/dist/middlewares/content-security-policy";
import Module from "../ioc/module";
import { BaseController } from "..";

export interface ApplicationConfig{
    app?: Application | Express;
    port: number;
    host: string;
    path?:string;
    cors?: crossorigin.CorsOptions | crossorigin.CorsOptionsDelegate | boolean;
    controllers: any[];
    middlewares?: any[];
    contentSecurityPolicy?: ContentSecurityPolicyOptions | boolean;
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
            contentSecurityPolicy
        } = config;

        

        this.app = app ? app : express();
        this.port = port;
        this.host = host;
        this.path = path ? () => path : () => "/";

        this.app.use(
            contentSecurityPolicy ? helmet({
                contentSecurityPolicy
            }) : 
        helmet());

        this.app.use(express.json());
        this.app.use(cookieParser());

        if(cors === true){
            this.app.use(crossorigin());
        }else if(cors && cors instanceof Object){
            this.app.use(crossorigin(cors));
        }

        if(!Array.isArray(controllers))
            throw new InvalidArgumentException("Controlller must be provided as an array");
        if(middlewares && !Array.isArray(middlewares))
            throw new InvalidArgumentException("Middlewares must be provided as an array");

        this.initializeMiddlwares(middlewares);
        this.initializeControllers(controllers);

        //Note that this middleware must be last since it depends on occasional next(new Exception()) call
        this.app.use(errorMiddleware());
        
        this.server = createServer(this.app);

    }

    private initializeControllers(controllers : any[]){
        controllers.push(HealthCheckController);

        let instances : BaseController[] = [];



        controllers.forEach(
            (x) => {
                instances.push(Module.container(x))
            }
        );
        
        for(var e of instances){
            e.routing();
        }

        instances.forEach(x => this.app.use(this.path(), x.router));
    }

    private initializeMiddlwares(middlewares? : any[]){
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
