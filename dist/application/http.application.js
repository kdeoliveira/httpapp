"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { ApplicationConfig } from "types/application.types";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const healthCheck_controller_1 = __importDefault(require("../controller/healthCheck.controller"));
const invalidArgument_exception_1 = __importDefault(require("../exceptions/invalidArgument.exception"));
const errorMiddleware_middleware_1 = __importDefault(require("../middleware/errorMiddleware.middleware"));
// import winston from "winston";
const logger_1 = require("../logger");
class HttpApplication {
    constructor(config) {
        if (!config)
            throw new invalidArgument_exception_1.default();
        const { app, port, host, path, cors, controllers, middlewares, } = config;
        this.app = app ? app : express_1.default();
        this.port = port;
        this.host = host;
        this.path = path ? () => path : () => "/";
        if (cors === true) {
            this.app.use(cors_1.default());
        }
        else if (cors && cors instanceof Object) {
            this.app.use(cors_1.default(cors));
        }
        if (!Array.isArray(controllers))
            throw new invalidArgument_exception_1.default("Controlller must be provided as an array");
        if (middlewares && !Array.isArray(middlewares))
            throw new invalidArgument_exception_1.default("Middlewares must be provided as an array");
        this.initializeControllers(controllers);
        this.initializeMiddlwares(middlewares);
        this.server = http_1.createServer(this.app);
    }
    initializeControllers(controllers) {
        this.app.use(new healthCheck_controller_1.default().router);
        controllers.forEach(x => this.app.use(this.path(), x.router));
    }
    initializeMiddlwares(middlewares) {
        //Note that orders matter in middlewares
        this.app.use(express_1.default.json());
        this.app.use(cookie_parser_1.default());
        // this.app.use(validationRequest());
        this.app.use(errorMiddleware_middleware_1.default());
        if (middlewares)
            middlewares.forEach(x => this.app.use(x));
    }
    getServer() {
        return this.server;
    }
    getApplication() {
        return this.app;
    }
    listen(callback) {
        logger_1.Logger.debug(`HTTP Application has started on port ${this.port}`);
        this.server.listen(this.port, this.host, callback);
    }
}
exports.default = HttpApplication;
//# sourceMappingURL=http.application.js.map