/// <reference types="node" />
import express, { Application, Express } from "express";
import crossorigin from "cors";
import http from "http";
import { ContentSecurityPolicyOptions } from "helmet/dist/middlewares/content-security-policy";
export interface ApplicationConfig {
    app?: Application | Express;
    port: number;
    host: string;
    path?: string;
    cors?: crossorigin.CorsOptions | crossorigin.CorsOptionsDelegate | boolean;
    controllers: any[];
    middlewares?: any[];
    contentSecurityPolicy?: ContentSecurityPolicyOptions | boolean;
}
export default class HttpApplication {
    private app;
    private server;
    private port;
    private host;
    path: () => string;
    constructor(config: ApplicationConfig);
    private initializeControllers;
    private initializeMiddlwares;
    getServer(): http.Server;
    getApplication(): express.Application;
    listen(callback?: () => void): void;
}
